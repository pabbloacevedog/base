'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const basename = path.basename(__filename);
import connection from '../middleware/database'

const models = {}
fs
    .readdirSync(__dirname)
    .filter((file) => {
        const returnFile = (file.indexOf('.') !== 0)
            && (file !== basename)
            && (file.slice(-3) === '.js');
        return returnFile;
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(connection, DataTypes)
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    console.log(modelName)
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = connection;
models.Sequelize = Sequelize;
// Removes all tables and recreates them (only available if env is not in production)
// const user = models.Usuario.create({
//     name: 'Pablo',
//     lastanem: 'Acevedo',
//     username: 'pablo_ag',
//     password: '$2b$10$9AFiWS.4zfpIdDc9aEcLheJN4CyLikUO86uEPgQlkB8SbuO8myGmO',
//     email: 'pablo.acevedo.g@gmail.com',
//     avatar: '../statics/profile.jpg',
//     review: '	Desarrollador/developer 📟 💻 🎮 📱'
// });
export default models;


// los modelos no se estan sincronizando la base de datos