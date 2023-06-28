const Dashboard = () => import('@pages/dashboard/dashboard.vue')
export default [
	{
		name:'Dashboard',
		path : '/',
		// props: true,
        component: Dashboard,
		beforeEnter(to, from, next) {
			if(!localStorage.getItem("token")){
                next()
            }
		}
	}
]
