import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();
import schema from '../schema/index.js'



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


export default async function (server, httpServer) {
    console.info('SETUP - GraphQL...')
    const wsServer = new WebSocketServer({
        server: server,
        path: '/graphql',
    });
    // Save the returned server's info so we can shutdown this server later
    const serverCleanup = useServer({ schema }, wsServer);
    const graphQLServer = new ApolloServer({
        uploads: {
            maxFileSize: 10000000, // 10 MB
            maxFiles: 20,
        },
        schema,
        // context: async (ctx, msg, args) => {
        //     // Returning an object will add that information to
        //     // contextValue, which all of our resolvers have access to.
        //     { pubsub, getDynamicContext(ctx, msg, args) };
        // },
        onConnect: async (ctx) => {
            // Check authentication every time a client connects.
            // if (tokenIsNotValid(ctx.connectionParams)) {
            //     // You can return false to close the connection  or throw an explicit error
            //     throw new Error('Auth token missing!');
            // }
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
    await graphQLServer.start();
    server.use('/graphql', expressMiddleware(graphQLServer, {
        context: async (ctx, msg, args) => {
            // Returning an object will add that information to
            // contextValue, which all of our resolvers have access to.
            // { pubsub, getDynamicContext(ctx, msg, args) };
        },
    }),);
}