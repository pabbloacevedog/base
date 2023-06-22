// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as usuario from './usuario/fields/query.js'
import * as login from './login/fields/query.js'
console.info(`INFO  - Cargando querys.`)
// Querys
const query = new GraphQLObjectType({
	name: 'query',
	description: '...',

	fields: () => ({
		...usuario,
		...login,
	})
})

export default query
