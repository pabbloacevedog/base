// App Imports

import models from '../models/index.js'
import config from '../config/config.json'
const { DB_FORCE_RESTART } = process.env;
export default async function (server) {
    console.info('SETUP - Sincronizando tablas de la base de datos...')
    // Crear tablas
    const sequelizeOptions = { logging: config.logging, alter: true };
    if (DB_FORCE_RESTART === 'true' && process.env.ENV !== 'production') {
        sequelizeOptions.alter = true;
    }
    models.sequelize.sync(sequelizeOptions).then(() => {
        console.info('INFO  - Base de datos sincronizada correctamente.')

        console.info('SETUP - Iniciando servidor...')
        // Inciar Servidor web
        server.listen({ port: config.port }, (error) => {
            if (error) {
                console.error('ERROR - Incapaz de iniciar el servidor.' + error)
            } else {
                console.info(`INFO  - Apollo Server corriendo en el puerto ${config.port}.`)
            }
        });
    })
        .catch((error) => {
            console.error('ERROR - Incapaz de sincronizar la base de datos.')
            console.error('ERROR - Servidor no iniciado.' + error)
            process.exit();
        })
    console.log('start', models.models)

}
