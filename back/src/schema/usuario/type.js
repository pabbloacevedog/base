// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLBoolean} from 'graphql'

// UsuarioType
const UsuarioType = new GraphQLObjectType({
	name: 'usuario',
	description: '...',
	fields: () => ({
        usuario_id:{
            type: GraphQLString
        },
        empresa_id: {
            type: GraphQLString
        },
        rut_usuario: {
            type: GraphQLString
        },
        nombre: {
            type: GraphQLString
        },
        usuario: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        telefono: {
            type: GraphQLString
        },
        avatar: {
            type: GraphQLString
        },
        ruta_avatar: {
            type: GraphQLString
        },
        verificado: {
            type: GraphQLString
        },
        facebook: {
            type: GraphQLString
        },
        whatsapp: {
            type: GraphQLString
        },
        fecha_creacion: {
            type: GraphQLString
        },
        fecha_actualizacion	: {
            type: GraphQLString
        },
        estado	: {
            type: GraphQLString
        },
        empresa_id: {
            type: GraphQLString
        },
        nombre_empresa: {
            type: GraphQLString
        },
        descripcion_empresa: {
            type: GraphQLString
        },
        logo_empresa: {
            type: GraphQLString
        },
        ruta_logo_empresa: {
            type:  GraphQLString
        },
	})
})

export default UsuarioType

