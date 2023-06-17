const Forget = () => import('components/auth/forget/forget.vue')
const Login = () => import('components/auth/login/login.vue')
const Reset = () => import('components/auth/reset/reset.vue')
const Registry = () => import('components/auth/registry/registry.vue')

export default [

	{
		path : '/forget',
        name : 'forget',
        component: Forget,
		beforeEnter(to, from, next) {
            if(!localStorage.getItem("token")){
                next()
            }
		}
	},
	{
		path : '/login',
        component: Login,
		beforeEnter(to, from, next) {

			if (!localStorage.getItem("token") ){
                next()
            }
		}
	},
	{
		name:'registro',
		path : '/registry',
        component: Registry,
		beforeEnter(to, from, next) {
			if(!localStorage.getItem("token")){
                next()
            }
		}
	},
	{
		name:'reset',
		path : '/reset/:token',
        component: Reset,
		beforeEnter(to, from, next) {
			if(!localStorage.getItem("token")){
                next()
            }
		}
	}
]
