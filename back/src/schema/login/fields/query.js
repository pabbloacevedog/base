// Imports
import {GraphQLString} from 'graphql'

// App Imports
import UserLoginType from '../type.js'
import {login, loginGoogle} from '../resolvers.js'

// Auth
export const userLogin = {
    type: UserLoginType,
    args: {
        email: {
            name: 'email',
            type: GraphQLString
        },

        password: {
            name: 'password',
            type: GraphQLString
        }
    },
    resolve: login
}
export const userLoginGoogle = {
    type: UserLoginType,
    args: {
        token: {
            name: 'token',
            type: GraphQLString
        },
    },
    resolve: loginGoogle
}