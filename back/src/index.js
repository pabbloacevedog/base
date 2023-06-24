// Imports
import express from 'express'
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config()
// App Imports
import setupLoadModules from './middleware/loadModules.js'
import setupGraphQL from './middleware/graphql.js'
import setupStartServer from './middleware/startServer.js'

// Create express server
const server = express()
const httpServer = createServer(server);
// Setup load modules
setupLoadModules(server)
// Setup GraphQL
setupGraphQL(server, httpServer)
// Start server
setupStartServer(httpServer)
