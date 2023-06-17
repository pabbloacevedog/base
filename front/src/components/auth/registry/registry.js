import Vue from 'vue'
import { mapGetters } from 'vuex'
import CryptoJS from 'crypto-js'

export default Vue.component('Registry', {
	$validates: 1,
	data () {
		return {
			email: '',
			password: '',
			name: '',
			lastname:'',
            usuario: '',
            confirm: '',
            id_profile_type: 0,
            title: 'Registro',
            avatar_default: '../statics/icons/android-chrome-512x512.png',
			items: [],
			birthdate:'1990/01/01',
			isPwd: true,
			alert: false,
			date: '2019/02/01',
			gender: '',
			generos: [
				{
				label: 'Hombre',
				value: '1'
				},
				{
				label: 'Mujer',
				value: '2'
				},
				{
				label: 'Otro',
				value: '3'
				}
			]
		}
	},
	props: {
	},
	computed: {
		...mapGetters({ isLogin: "Registry/isLogin", error: "Registry/error" })
	},
	methods: {
        validar(){
            let error = false
            if (this.name == "" || this.name == ""){
                error = true
            }
            if (this.lastname == "" || this.lastname == ""){
                error = true
            }
            if (this.email == "" || this.email == ""){
                error = true
            }
            if (this.password == "" || this.password == ""){
                error = true
            }
            return error
        },
		async register () {
            if (this.validar()){
                var message = 'Faltan campos que completar'
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
                debugger
                const {name, lastname, email,password } = this
                var pass = process.env.PASSPHRASE;
                var encrypted = CryptoJS.AES.encrypt(password, pass);
                await this.$store.dispatch("Registry/registry", { name, lastname , email, password: encrypted.toString() }).then(res => {
                    this.$q.loading.hide()
                    if(this.error){
                        var message = this.error.message.replace('GraphQL error:','')
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
                            message: "Login success",
                            timeout: 3000,
                            type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                            position: 'bottom',
                            icon: 'done_all'
                        })
                        // location.reload();
                        this.$router.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
		}
	},
	components: {
	},

	created () {
		console.log('en registro')

	},
	mounted () {

	},
	updated () {
	}

})
