// App Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import models from '../../models/index.js'
import config from '../../config/config.json'  
import CryptoJS from 'crypto-js'
import decode from 'jwt-decode'
// import {getAll} from '../resolvers'
export async function login(parentValue, { email, password }) {
	const usuario = await models.Usuario.findOne({ where: { email } })
		if (!usuario) {
			const usuario = await models.Usuario.findOne({ where: { usuario: email } })
            if (!usuario) {
                throw new Error(`No tenemos ningún usuario registrado con el email ${ email }. Por favor regístrese.`)
            } else {
                var pass = config.passphrase;
                var decrypted = CryptoJS.AES.decrypt(password, pass)
                var passDecryp = decrypted.toString(CryptoJS.enc.Utf8)
                const datosUsuarioDetalles = usuario.get()
                const empresa = await models.Empresa.findOne({ where: { empresa_id: datosUsuarioDetalles.empresa_id } })
                const passwordMatch = await bcrypt.compare(passDecryp, datosUsuarioDetalles.password)
                if (!passwordMatch) {
                    throw new Error(`Lo sentimos, la contraseña que ingresaste es incorrecta. Inténtalo de nuevo.`)
                } else {
                    const router = await models.Router.findAll({ where: { enabled: 1 }})
                    var data = {
                        datosUsuario:datosUsuarioDetalles,
                        datosEmpresa: empresa,
                        routers:router
                    }
                    return {
                        token: jwt.sign(data, config.secret)
                    }
                }
            }
		} else {
            var pass = config.passphrase;
            var decrypted = CryptoJS.AES.decrypt(password, pass)
            var passDecryp = decrypted.toString(CryptoJS.enc.Utf8)
			const datosUsuarioDetalles = usuario.get()
			const passwordMatch = await bcrypt.compare(passDecryp, datosUsuarioDetalles.password)
			if (!passwordMatch) {
				throw new Error(`Lo sentimos, la contraseña que ingresaste es incorrecta. Inténtalo de nuevo.`)
			} else {
                const empresa = await models.Empresa.findOne({ where: { empresa_id: datosUsuarioDetalles.empresa_id } })
                console.log(empresa)
				const router = await models.Router.findAll({ where: { enabled: 1 }})
				var data = {
					datosUsuario:datosUsuarioDetalles,
                    datosEmpresa: empresa,
					routers:router
				}
				return {
					token: jwt.sign(data, config.secret)
				}
			}
		}
}

export async function loginGoogle(parentValue, { token}) {
    const user = decode(token)
	const usuario = await models.Usuario.findOne({ where: { email: user.email } })
    if (usuario) {
        const datosUsuarioDetalles = usuario.get()
        const empresa = await models.Empresa.findOne({ where: { empresa_id: datosUsuarioDetalles.empresa_id } })
        const router = await models.Router.findAll({ where: { enabled: 1 }})
        var data = {
            datosUsuario:datosUsuarioDetalles,
            datosEmpresa: empresa,
            routers:router
        }
        return {
            token: jwt.sign(data, config.secret)
        }
        
    } else {
        console.log(user)
        var creado = false
        var crear = {
            nombre : user.name, 
            email : user.email, 
            avatar: user.picture
        }
        await models.Usuario.create(crear).then(cre => {
            creado = true
        }).catch(err => {
            console.log(err)
            error = err
        })
        if(creado){
            var nuevo_usuario = await models.Usuario.findOne({ where: { email: user.email } })
            const datosUsuarioDetalles = nuevo_usuario.get()
            const empresa = await models.Empresa.findOne({ where: { empresa_id: datosUsuarioDetalles.empresa_id } })
            const router = await models.Router.findAll({ where: { enabled: 1 }})
            var data = {
                datosUsuario:datosUsuarioDetalles,
                datosEmpresa: empresa,
                routers:router
            }
            return {
                token: jwt.sign(data, config.secret)
            }
        }
        else{
            throw new Error(`Error al crear el usuario ` + error)
        }

    }
}