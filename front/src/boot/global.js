import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
    app.config.globalProperties.$avatar_default = 'src/statics/user.png'
    // app.config.globalProperties.$idioma = 'en-us'
    app.config.globalProperties.$idioma = 'es-es'
    ////colores del tema de la app //////
    app.config.globalProperties.$dark = false
    app.config.globalProperties.$glass = true
    app.config.globalProperties.$usuario_id = ''
    app.config.globalProperties.$avatar = ''
    app.config.globalProperties.$nombre = ''
    app.config.globalProperties.$tipo_usuario = ''
})
