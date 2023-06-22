// Imports
import {GraphQLObjectType, GraphQLString} from 'graphql'

// User Login type
const UserLoginType = new GraphQLObjectType({
    name: 'UserLogin',
    description: 'Autentincación de usuario',

    fields: () => ({
        token: {
            type: GraphQLString 
        },
        email: {
            type: GraphQLString 
        },
        password: {
            type: GraphQLString 
        },
    })
})

export default UserLoginType
