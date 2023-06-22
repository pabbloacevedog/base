// App Imports

import models from '../models/index.js'
import config from '../config/config.json' 
export default function (server) {
	console.info('SETUP - Sincronizando tablas de la base de datos...')
	// Crear tablas
    console.log(models)
	models.sequelize.sync({ alter: true }).then(() => {
		console.info('INFO  - Base de datos sincronizada correctamente.')

		console.info('SETUP - Iniciando servidor...')
		const user =  models.User.create({
			name: 'Pablo',
			lastanem: 'Acevedo',
			username: 'pablo_ag',
			password: '$2b$10$9AFiWS.4zfpIdDc9aEcLheJN4CyLikUO86uEPgQlkB8SbuO8myGmO',
			email:'pablo.acevedo.g@gmail.com',
			avatar: '../statics/profile.jpg',
			review: '	Desarrollador/developer 📟 💻 🎮 📱'
		});
		user.userPost({
			route_img: '../statics/post/5c0c00a3-da6d-5986-847d-d51d1747bd30/234234234234.jpg' ,
			text:'defy swab haunt marbling'
		});
        // Inciar Servidor web
        server.listen({ port: config.port }, (error) => {
            if (error) {
				console.error('ERROR - Incapaz de iniciar el servidor.' + error)
			} else {
                console.info(`INFO  - Apollo Server corriendo en el puerto ${ config.port }.`)
			}
        });
	})
	.catch((error) => {
		console.error('ERROR - Incapaz de sincronizar la base de datos.')
		console.error('ERROR - Servidor no iniciado.' + error)
	})
}
