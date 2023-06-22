// Imports
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import config from '../config/config.json' 
import helmet from 'helmet'

// Load express modules
export default function (server) {
    console.info('SETUP - Cargando modulos...')
    console.info('SETUP - Acceso a cliente: ' + config.client )
	// Enable CORS
	server.use(cors())
	server.use(express.static('public'));
	// secure express app


    // configurar helmet para dev y prod

    
	// server.use(helmet({
	// 	dnsPrefetchControl: false,
	// 	frameguard: false,
	// 	ieNoOpen: false,
	// }));
	// Request body parser
	server.use(bodyParser.json())
	server.use(bodyParser.urlencoded({
		extended: false
	}))

	// Request body cookie parser
	server.use(cookieParser())

	// HTTP logger
	server.use(morgan('tiny'))
}
