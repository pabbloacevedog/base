import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();
import schema from '../schema/index.js'
import { getDynamicContext } from '../utils/index.js'

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
            // contextValue, which all of our resolvers have access to.
            { pubsub, getDynamicContext(ctx, msg, args) };
        },
    }),);
}