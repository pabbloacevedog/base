/* eslint-disable vue/multi-word-component-names */
import Vue from 'vue'
import { mapGetters } from 'vuex'
import CryptoJS from 'crypto-js'

export default Vue.component('Login', {
    $validates: true,
    data () {
        return {
            email: '',
            password: '',
			error_: '',
			usuario:'',
            logo_google:'../../../statics/login/google.png',
			isPwd: true,
            googleSignInParams: {
                clientId: process.env.ID_CLIENTE_GOOGLE,
                client_id: process.env.ID_CLIENTE_GOOGLE
            },
			avatar_default: '../statics/icons/android-chrome-192x192.png',
			lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
	},
	computed: {
		...mapGetters({ isLogin: "Auth/isLogin", error: "Auth/error", datos_usuario: "Auth/getDatosUsuario" })
	},
    methods: {
        validar(){
            let error = false
            if (this.email == "" || this.email == ""){
                error = true
            }
            if (this.password == "" || this.password == ""){
                error = true
            }
            return error
        },
        async authenticate() {
            if (this.validar()){
                var message = 'Todos los campos son obligatorios'
                this.$q.notify({
                    message: message,
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else{
                this.$q.loading.show()
                const {email, password} = this
                var self = this
                var pass = process.env.PASSPHRASE;
                var encrypted = CryptoJS.AES.encrypt(password, pass);
                await this.$store.dispatch("Auth/login", {
                    email: email,
                    password: encrypted.toString()
                }).then(res => {
                    this.$q.loading.hide()
                    if(this.error){
                        var message = this.error.message.replace('GraphQL error: ','')
                        this.$q.notify({
                            message: message,
                            timeout: 3000,
                            type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                            position: 'bottom',
                            icon: 'report_problem'
                        })
                    }
                    else{
                        this.$q.notify({
                            message: "Bienvenido de nuevo " + this.datos_usuario.nombre,
                            timeout: 3000,
                            type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                            position: 'bottom',
                            style : 'border-radius: 20px;',
                            icon: 'done_all'
                        })
                        this.grabarDatosUsuario(this.datos_usuario)
                        this.$router.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
		},
        async authenticateGoogle(token) {
            await this.$store.dispatch("Auth/loginGoogle", {
                token: token
            }).then(res => {
                this.$q.loading.hide()
                if(this.error){
                    var message = this.error.message.replace('GraphQL error: ','')
                    this.$q.notify({
                        message: message,
                        timeout: 3000,
                        type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'report_problem'
                    })
                }
                else{
                    this.$q.notify({
                        message: "Bienvenido de nuevo " + this.datos_usuario.nombre,
                        timeout: 3000,
                        type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        style : 'border-radius: 20px;',
                        icon: 'done_all'
                    })
                    this.grabarDatosUsuario(this.datos_usuario)
                    this.$router.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
		},
        grabarDatosUsuario(datos){
            this.$usuario_id =  datos.usuario_id
            this.$avatar =  datos.avatar
            this.$nombre =  datos.nombre
            this.$usuario =  datos.usuario
            this.$rut_usuario =  datos.rut_usuario
            this.$email =  datos.email
            this.$tipo_usuario =  datos.usuario_id
        },
        grabarDatosUsuarioGoogle(datos){
            this.$usuario_id =  datos.usuario_id
            this.$avatar =  datos.avatar
            this.$nombre =  datos.nombre
            this.$usuario =  datos.usuario
            this.$rut_usuario =  datos.rut_usuario
            this.$email =  datos.email
            this.$tipo_usuario =  datos.usuario_id
        },
        pintar(e){
            const x = e.pageX - e.target.offsetLeft
            const y = e.pageY - e.target.offsetTop
            e.target.style.setProperty('--x', `${ x }px`)
            e.target.style.setProperty('--y', `${ y }px`)
        },
        async onSignInSuccess (googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            await this.authenticateGoogle(id_token)
        },
        onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
        }
    },
    components: {
    },

    created () {
        console.log('id',this.googleSignInParams)
    },
    mounted () {

    },
    updated () {
    }

})
