export  function crearRouter(data) {
    var routers = []
    console.log(data)
	data.forEach((item) => {
        let menu = Object.assign({}, item)
        if(menu.auth){
            let componenteCreado = componenteAuth(menu.name, menu.carpet, menu.path)
            console.log('componenteAuth',componenteCreado)
            routers.push(componenteCreado)
        }
        else{
            let componenteCreado = componente(menu.name, menu.carpet, menu.path)
            console.log('componente',componenteCreado)
            routers.push(componenteCreado)
        }

	})
	return routers
}
function componente(name, carpet, path){
    const componente = () => import(`@/${carpet}/${name}/${name}.vue`)
	return {
        path : path,
        name: name,
        props: true,
        component : componente
	}
}
function componenteAuth(name, carpet, path){
    const componente = () => import(`@/${carpet}/${name}/${name}.vue`)
	return {
        path : path,
        name: name,
        props: true,
        component : componente,
        beforeEnter(to, from, next) {
			if (!localStorage.getItem("token") ){
                next('/login')
			}
			else{
				next()
			}
		}
	}
}
export  function crearRutas(data) {
    var rutas = []
	data.forEach((item) => {
		let menu = Object.assign({}, item)
		if(menu.addroute){
			var ruta = {
				component: menu.component,
				name: menu.name,
				path: menu.path,
				carpet: menu.carpet,
				order: menu.order_menu,
				icon: menu.icon,
				addmenu: menu.addmenu
			}
			rutas.push(ruta)
		}
	})
	return rutas
}