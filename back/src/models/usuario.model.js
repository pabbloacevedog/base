// User
import { Model, Sequelize } from 'sequelize';
const schema = {
	usuario_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
	},
	rut_usuario: {
		type: Sequelize.STRING(20)
	},
	nombre: {
		type: Sequelize.STRING(200)
	},
	usuario: {
		type: Sequelize.STRING(100)
	},
	password: {
		type: Sequelize.STRING(500)
	},
	email: {
		type: Sequelize.STRING(500)
	},
    telefono: {
		type: Sequelize.STRING(20)
	},
	avatar: {
		type: Sequelize.STRING(1000)
    },
    ruta_avatar: {
		type: Sequelize.STRING(1000)
	},
	verificado: {
		type: Sequelize.INTEGER(1)
	},
	facebook: {
		type: Sequelize.STRING(500)
	},
	whatsapp: {
		type: Sequelize.STRING(500)
	},
	fecha_creacion: {
		type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
	},
	fecha_actualizacion	: {
		type: Sequelize.DATE
	},
    estado: {
		type: Sequelize.STRING(20)
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
module.exports = (sequelize) => {
	class Usuario extends Model {
		// static associate() {
        //     this.belongsTo(sequelize.models.Empresa, { foreignKey: 'empresa_id' });
		// }
	}
	Usuario.init(schema, {
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion',
        tableName: 'usuario',
        sequelize,
	}, index);
	return Usuario;
};


