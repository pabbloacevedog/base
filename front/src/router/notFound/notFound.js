const NotFound = () => import('pages/ErrorNotFound.vue')
export default [
	{
		name:'NotFound',
		path: '/:catchAll(.*)*',
		// props: true,
        component: NotFound
	}
]
