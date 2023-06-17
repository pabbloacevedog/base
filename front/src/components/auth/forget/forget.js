import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('forget', {
    $validates: true,
    data () {
        return {
            email: '',
            password: '',
			error_: '',
			username:'',
			isPwd: true,
			avatar_default: '../statics/user.png',
			lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
	},
	computed: {
		// ...mapGetters({ isLogin: "Auth/isLogin", error: "Auth/error" })
	},
    methods: {
        async enviar () {

		},
		async registrarse(){

		}
    },
    components: {
    },

    created () {
    },
    mounted () {

    },
    updated () {
    }

})
