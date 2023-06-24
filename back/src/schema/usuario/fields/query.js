// Imports
import {GraphQLString, GraphQLList} from 'graphql'

// App Imports
import UsuarioType from '../type.js'
import {traer_todos, buscar_por_usuario, existe_usuario ,buscar_usuario, datos_usuario} from '../resolvers.js'

// Usuarios All
export const Usuarios = {
    type: new GraphQLList(UsuarioType),
    resolve: traer_todos
}

// usuario By ID
export const DatosUsuario = {
    type: UsuarioType,
    args: {
        usuario_id: {
            type: GraphQLString
        }
    },
    resolve: datos_usuario
}
export const BuscarUsuarioUsuario = {
    type: UsuarioType,
    args: {
        usuario: {
            type: GraphQLString
        }
    },
    resolve: buscar_por_usuario
}
// export const BuscarUsuarioemail = {
//     type: UsuarioType,
//     args: {
//         email: {
//             type: GraphQLString
//         }
//     },
//     resolve: buscar_por_email
// }
export const ExisteUsuario = {
	type: UsuarioType,
	args: {
		usuario: {
		    type: GraphQLString
		}
	},
	resolve: existe_usuario
}

export const BuscarUsuario = {
	type: new GraphQLList(UsuarioType),
	args: {
		word: {
		    type: GraphQLString
		}
	},
	resolve: buscar_usuario
}