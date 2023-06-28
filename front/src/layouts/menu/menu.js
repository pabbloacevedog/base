import Vue from 'vue'
import { openURL } from "quasar";
import { mapGetters } from 'vuex'
import { colors } from 'quasar'
import {getUserFromToken} from '@utils/authService'
import {getLocalStorage} from '@utils/alamacenamientoLocal'

export default Vue.component('Menu', {
	components: {
	},
	data() {
		return {
			leftDrawerOpen: this.$q.platform.is.desktop,
            miniState: true,
            usuario_model:true,
            existe_empresa: false,
            usuario_id: '',
            mostrarDrawer: true,
            mostrar_menu: true,
            mostrar_ajustes_usuario: false,
			nodes: this.$router.options.routes,
			src_logo: '../../statics/icons/favicon-32x32.png',
            src_avatar: process.env.BASE_URL + this.$avatar,
            src_avatar_default: '../../statics/defecto.png',
            base : process.env.BASE_URL,
			usuario: true,
			bluetooth: false,
			// menuList: {},
            tipo_usuario:'Garzón',
			link: "",
			nombre: "",
			alias: "",
			email: "",
            text:'',
            upload_files: false,
            funciones_chip:{
                ir_ajustes:this.ir_ajustes
            },
            menuList : [
                {
                    icono: 'table_chart',
                    nombre: 'Mesas',
                    separator: false
                },
                {
                    icono: 'shopping_cart',
                    nombre: 'Productos',
                    separator: false
                },
                {
                    icono: 'kitchen',
                    nombre: 'Cocina',
                    separator: false
                },
                {
                    icono: 'person',
                    nombre: 'Usuarios',
                    separator: true
                },
                {
                    icono: 'settings',
                    nombre: 'Configuración',
                    separator: false
                },
                {
                    icono: 'store',
                    nombre: 'Inventario',
                    separator: false
                },
                {
                    icono: 'help',
                    iconColor: 'primary',
                    nombre: 'Ayuda',
                    separator: false
                }
            ]
		}
	},
	props: {
	},
	computed: {
		...mapGetters({ 
            getMenu: 'Menu/getMenu'},{ isLogin: "Auth/isLogin", error: "Auth/error" }, {avatar: "Profile/getUpload" })
	},
	methods: {
		openURL,
		logout() {
			this.$q.loading.show()
			this.$store.dispatch("Auth/logout", {usuario_id: this.usuario_id}).then(res => {
				this.$q.loading.hide()
				this.$router.push('/login')

				// location.reload();
			}).catch(err => {
				console.error("ERROR: ", err)
			})
		},
		cargarDatos(){
			this.$store.dispatch("Menu/getDatos", {}).then(res =>{
				this.menuList = this.getMenu

				// console.log('menu ',this.menuList)
			}).catch(err => {
				console.log("ERROR: ", err)
			})
		},
		explorar(){

		},
		goempresa(){
            console.log(this.usuario)
			this.$router.push({name: 'empresa', params: { usuario: this.usuario } })
        },
        goProfileFound(usuario){
			this.$router.push('/'+usuario)
        },
        ir_home(){
            if(this.$route.name == 'home'){
                location.reload();
            }
            else{
                this.$router.push('/')
            }
        },
        getDatosUser(datos){
            // this.src_avatar = this.base + datos.avatar
            if(datos.avatar == '' || datos.avatar == null){
                this.src_avatar = this.src_avatar_default
            }
            this.usuario = datos.usuario
			this.nombre = datos.nombre
            this.usuario_id = datos.usuario_id
        },
        openDialog(){
            this.upload_files = true
        },
        mostrar_menu_usuario(){
            console.log('mostrar menu dropdown')
        },
        ir_ajustes(){
            this.mostrar_ajustes_usuario = true
        }
	},
	created() {
		if (!this.isLogin) {
            const token = localStorage.getItem('token')
            const datos = getUserFromToken(token)
            this.getDatosUser(datos.datosUsuario)
            let datos_empresa = getLocalStorage('DE_'+ this.usuario_id)
            console.log(datos_empresa)
            if(datos_empresa){
                this.datos_empresa = datos_empresa
                this.existe_empresa = true
            }
            let data = getLocalStorage('RO_' + this.usuario_id)
            if(data){
                this.nodes.push(...data)
                localStorage.setItem('isLoadNodes', 'true')
            }
		}
		// this.cargarDatos()

	},
	mounted() {
        // $('.q-toolbar__title').removeClass('ellipsis') 
	},
	watch: {
        '$avatar': function () {
            this.src_avatar = this.$avatar
        },
	}


})
