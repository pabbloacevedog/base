// Imports
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'

// App Imports
dotenv.config()
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
// Load database config
const config = {
    host: DB_HOST,
    dialect: 'mysql',
    logging: process.env.ENV === 'production' ? false : console.log,
    freezeTableName: true,
    dialectOptions: {
        charset: 'utf8',
    }
}
// Create new database connection
const connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, config);
// Test connection
console.info('SETUP - Conectando Base de datos...')

connection.authenticate().then(() => {
    console.info('INFO  - Base de datos conectada.')
})
    .catch(err => {
        console.error('ERROR - Incapaz conectar base de datos:', err)
    })

export default connection
