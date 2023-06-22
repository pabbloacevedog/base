// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as usuario from './usuario/fields/mutations.js'

// Mutation
const mutation = new GraphQLObjectType({
    name: 'mutations',
    description: '...',

    fields: {
        ...usuario,
    }
})

export default mutation
