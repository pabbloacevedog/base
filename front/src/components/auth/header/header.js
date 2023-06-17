import Vue from 'vue'
import { openURL } from "quasar";
import { mapGetters } from 'vuex'
import { colors } from 'quasar'
import {getUserFromToken} from '@utils/authService'

export default Vue.component('Header', {
	components: {
	},
	data() {
		return {
			leftDrawerOpen: this.$q.platform.is.desktop,
			nodes: this.$router.options.routes,
			mobileData: true,
			bluetooth: false,
			menuList: {},
			subMenuList: {},
			link: "",
			nombre: "",
			alias: "",
			email: "",
			text:''
		}
	},
	props: {
	},
	computed: {
		// ...mapGetters({ getMenu: 'Menu/getMenu'},{ isLogin: "Auth/isLogin", error: "Auth/error" })
	},
	methods: {
	},
	created() {

	},
	mounted() {
	},
	watch: {
	}


})
