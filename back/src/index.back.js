import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
import setupStartServer from './middleware/startServer.js'
// import resolvers from './resolvers';
// import typeDefs from './typeDefs';
import schema from './schema/index.js'
// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);
const findUser = async (authToken) => {
    // Find a user by their auth token
    console.log('findUser', authToken)
    return { id: 1, name: 'Test User' };
};
const tokenIsNotValid = (connectionParams) => {
    // Check if the token is valid
    console.log('tokenIsNotValid', connectionParams)
    return false;
};
const getDynamicContext = async (ctx, msg, args) => {
    // ctx is the graphql-ws Context where connectionParams live
    if (ctx.connectionParams.authentication) {
        const currentUser = await findUser(ctx.connectionParams.authentication);
        return { currentUser };
    }
    // Otherwise let our resolvers know we don't have a current user
    return { currentUser: null };
};
// Set up ApolloServer.
const server = new ApolloServer({
    schema,
    context: async (ctx, msg, args) => {
        // Returning an object will add that information to
        // contextValue, which all of our resolvers have access to.
        { pubsub, getDynamicContext(ctx, msg, args) };
    },
    onConnect: async (ctx) => {
        // Check authentication every time a client connects.
        if (tokenIsNotValid(ctx.connectionParams)) {
            // You can return false to close the connection  or throw an explicit error
            throw new Error('Auth token missing!');
        }
    },
    onDisconnect(ctx, code, reason) {
        console.log('Disconnected!');
    },
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

await server.start();
app.use(cors())
app.use(express.static('public'));
// secure express app
app.use(helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
}));
// Request body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// Request body cookie parser
app.use(cookieParser())

// HTTP logger
app.use(morgan('tiny'))
app.use('/graphql', expressMiddleware(server));

// const PORT = 4000;
setupStartServer(httpServer)
// // Now that our HTTP server is fully set up, we can listen to it.
// httpServer.listen(PORT, () => {
//     console.log(`Server is now running on http://localhost:${PORT}/graphql`);
// });