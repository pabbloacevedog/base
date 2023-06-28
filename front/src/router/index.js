import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import notFound from './notFound/notFound'
import menu from './menu/menu'
import Auth from './auth/auth'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
//se define la variable auxiliar como arreglo para agregar mas de una ruta de archivos externos.
const auxiliar = [];
//concatenamos las rutas y asignamos la variable route que usara vue router
const routes = auxiliar.concat(
    //aqui se agregan las rutas de los archivos o paginas del sistema
    Auth,
    menu,
    notFound,
    //incluir siempre el router del empresa, al final, ya que al recibir el parametro, causa conflicto con los otros routers
    //   empresa
)
export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE)
    })

    return Router
})
