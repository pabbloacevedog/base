import { InMemoryCache, ApolloLink, split} from '@apollo/client/core'
import { setContext as ST } from 'apollo-link-context'
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from "@apollo/client/link/error";
export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
    const httpLink = createUploadLink({ uri: process.env.API_URL, fetch: fetch })
    const wsLink = new WebSocketLink({
        uri: process.env.API_WS_URL,
        options: {
            reconnect: true,
            connectionParams: {
                authentication: user.authToken,
              },
            connectionParams: () => {
                const token = localStorage.getItem('token')
                // return the headers to the context so httpLink can read them
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : ''
                    }
                }
            },
        },
    })
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
    return Object.assign(
        // General options.
        {
            link: ApolloLink.from([
                onError(({ graphQLErrors, networkError }) => {
                    if (graphQLErrors)
                        graphQLErrors.forEach(({ message, locations, path }) =>
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

        },
        // Specific Quasar mode options.
        process.env.MODE === 'spa'
            ? {
                //
            }
            : {},
        process.env.MODE === 'ssr'
            ? {
                //
            }
            : {},
        process.env.MODE === 'pwa'
            ? {
                //
            }
            : {},
        process.env.MODE === 'bex'
            ? {
                //
            }
            : {},
        process.env.MODE === 'cordova'
            ? {
                //
            }
            : {},
        process.env.MODE === 'capacitor'
            ? {
                //
            }
            : {},
        process.env.MODE === 'electron'
            ? {
                //
            }
            : {},
        // dev/prod options.
        process.env.DEV
            ? {
                //
            }
            : {},
        process.env.PROD
            ? {
                //
            }
            : {},
        // For ssr mode, when on server.
        process.env.MODE === 'ssr' && process.env.SERVER
            ? {
                ssrMode: true,
            }
            : {},
        // For ssr mode, when on client.
        process.env.MODE === 'ssr' && process.env.CLIENT
            ? {
                ssrForceFetchDelay: 100,
            }
            : {}
    )
}
