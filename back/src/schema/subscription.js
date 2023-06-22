// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
// import * as message from './message/fields/subscriptions'
// Mutation
const subscription = new GraphQLObjectType({
    name: 'subscription',
    description: '...',
    fields: {
        // ...message
    }
})

export default subscription