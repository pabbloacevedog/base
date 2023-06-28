import { defineComponent, computed, ref, watch } from 'vue'
import { useAuthStore } from 'stores/auth/auth.js'
import CryptoJS from 'crypto-js'
import { useQuasar } from 'quasar'
// import { apolloClient } from 'src/boot/apollo'
import { USUARIOS_QUERY } from 'src/stores/auth/consultas'
import { useQuery } from '@vue/apollo-composable'
export default defineComponent({
    name: 'AuthLogin',
    $validates: true,
    setup() {

        const credenciales = ref({});
        const auth = useAuthStore();
        let isPwd = false;
        const avatar_default = ref('src/assets/icons/android-chrome-192x192.png');
        const $q = useQuasar()
        const users = ref([]);
        let { result } = useQuery(USUARIOS_QUERY)
        watch(() => credenciales.value.password, (val) => {
            if (val.length > 0) {
                isPwd = true
            }
            else {
                isPwd = false
            }
        })
        watch(result, (newResult) => {
            users.value = newResult.Usuarios
        })
        async function authenticate() {
            $q.loading.show()
            const { email, password } = credenciales.value
            var pass = process.env.PASSPHRASE;
            var encrypted = CryptoJS.AES.encrypt(password, pass);
            auth.login({
                email: email,
                password: encrypted.toString()
            })
                .then((result) => {
                    if (error) {
                        console.log('error', error)
                        $q.notify({
                            message: result,
                            timeout: 3000,
                            type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                            position: 'bottom',
                            icon: 'report_problem'
                        })
                    }
                    else {
                        $q.notify({
                            message: "Bienvenido de nuevo " + datos_usuario.nombre,
                            timeout: 3000,
                            type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                            position: 'bottom',
                            style: 'border-radius: 20px;',
                            icon: 'done_all'
                        })
                    }
                    $q.loading.hide()
                })
                .catch((error) => console.error(error));
        };
        const datos_usuario = computed(() => auth.datosUsuario)
        const error = computed(() => auth.error)
        return {
            credenciales,
            datos_usuario,
            avatar_default,
            isPwd,
            $q,
            auth,
            users,
            error,
            authenticate
        }
    },
    methods: {
        validar() {
            let error = false;
            if (this.credenciales.email == "" || this.credenciales.email == "") {
                error = true
            }
            return error
        },
        // async authenticate() {
        //     if (this.validar()) {
        //         var message = 'Todos los campos son obligatorios'
        //         this.$q.notify({
        //             message: message,
        //             timeout: 3000,
        //             type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
        //             position: 'bottom',
        //             icon: 'report_problem'
        //         })
        //     }
        //     else {
        //         this.$q.loading.show()
        //         const { email, password } = this.credenciales
        //         var pass = process.env.PASSPHRASE;
        //         var encrypted = CryptoJS.AES.encrypt(password, pass);
        //         await this.auth.login({ email: email, password: encrypted.toString() })
        //         this.datos_usuario = computed(() => this.auth.datos_usuario)
        //         this.error = computed(() => this.auth.error)
        //         if (this.error) {
        //             var message = this.error.message.replace('GraphQL error: ', '')
        //             this.$q.notify({
        //                 message: message,
        //                 timeout: 3000,
        //                 type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
        //                 position: 'bottom',
        //                 icon: 'report_problem'
        //             })
        //         }
        //         else {
        //             this.$q.notify({
        //                 message: "Bienvenido de nuevo " + this.datos_usuario.nombre,
        //                 timeout: 3000,
        //                 type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
        //                 position: 'bottom',
        //                 style: 'border-radius: 20px;',
        //                 icon: 'done_all'
        //             })
        //             this.grabarDatosUsuario(this.datos_usuario)
        //             this.$router.push({ path: '/' })
        //         }
        //         this.$q.loading.hide()
        //     }
        // },
        grabarDatosUsuario(datos) {
            this.$usuario_id = datos.usuario_id
            this.$avatar = datos.avatar
            this.$nombre = datos.nombre
            this.$usuario = datos.usuario
            this.$rut_usuario = datos.rut_usuario
            this.$email = datos.email
            this.$tipo_usuario = datos.usuario_id
        },
    },
    components: {
    },

    created() {
        console.log('created login', this.users)
    },
    mounted() {
    },
    updated() {
    },

})
