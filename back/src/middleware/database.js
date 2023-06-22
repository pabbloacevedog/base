// Imports
import {Sequelize} from 'sequelize'

// App Imports
import env from '../config/env.js'
import databaseConfig from '../config/database.json' 

// Load database config
const databaseConfigEnv = databaseConfig[env]

// Create new database connection
const connection = new Sequelize(
	databaseConfigEnv.database,
	databaseConfigEnv.username,
	databaseConfigEnv.password,
	{
		host: databaseConfigEnv.host,
		dialect: databaseConfigEnv.dialect,
		logging: false,
		freezeTableName: true
	}
)
// Test connection
console.info('SETUP - Conectando Base de datos...')

connection.authenticate().then(() => {
    console.info('INFO  - Base de datos conectada.')
})
.catch(err => {
    console.error('ERROR - Incapaz conectar base de datos:', err)
})

export default connection
