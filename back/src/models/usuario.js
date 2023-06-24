'use strict';

module.exports = function (sequelize, DataTypes) {
    const schema = {
        usuario_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        rut_usuario: {
            type: DataTypes.STRING(20)
        },
        nombre: {
            type: DataTypes.STRING(200)
        },
        usuario: {
            type: DataTypes.STRING(100)
        },
        password: {
            type: DataTypes.STRING(500)
        },
        email: {
            type: DataTypes.STRING(500)
        },
        telefono: {
            type: DataTypes.STRING(20)
        },
        avatar: {
            type: DataTypes.STRING(1000)
        },
        ruta_avatar: {
            type: DataTypes.STRING(1000)
        },
        verificado: {
            type: DataTypes.INTEGER(1)
        },
        facebook: {
            type: DataTypes.STRING(500)
        },
        whatsapp: {
            type: DataTypes.STRING(500)
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        fecha_actualizacion	: {
            type: DataTypes.DATE
        },
        estado: {
            type: DataTypes.STRING(20)
        },
    };
    const  index =  {
        indexes:[
            {
                unique: false,
                fields:['usuario_id','email']
            }
        ]
    }
    const Usuario = sequelize.define('Usuario',schema, {
        classMethods: {
            associate: function (models) {
                // Usuario.belongsTo(models.Department, { foreignKey: { allowNull: false } });
            }
        },
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion',
        tableName: 'usuario',
        paranoid: false,
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true
    }, index);
    return Usuario;
};