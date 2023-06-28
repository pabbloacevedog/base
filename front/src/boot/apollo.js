import { provide } from 'vue'
import { ApolloClient, InMemoryCache, ApolloLink, split  } from '@apollo/client/core'
import { boot } from 'quasar/wrappers'
import { setContext as ST } from 'apollo-link-context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from "@apollo/client/link/error";
import { createClient } from 'graphql-ws';
import { DefaultApolloClient } from '@vue/apollo-composable'
let apolloClient = new Object();
export default boot(/* async */({ app }) => {
    const httpLink = createUploadLink({ uri: 'http://localhost:5001/graphql', fetch: fetch })
    const wsLink = new GraphQLWsLink(createClient({
        uri: 'ws://localhost:5001/graphql',
        reconnect: true,
    }));
    const authLink = ST((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('token')
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    })
    const terminatingLink = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            // console.log(definition);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink
    );
    apolloClient = new ApolloClient({
        // link,
        link:  ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.map(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                        ),
                    );
                if (networkError) console.log(`[Network error]: ${networkError}`);
            }),
            authLink,
            terminatingLink
        ]),
        cache: new InMemoryCache(),
        connectToDevTools: true
    })
    
    app.provide(DefaultApolloClient, apolloClient)
    app.setup = () => {
        provide(DefaultApolloClient, apolloClient)
        return {}
    }
    // app.use(apolloClient)
    app.config.globalProperties.$apollo = apolloClient
})
export { apolloClient }