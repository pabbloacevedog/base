import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { LOGIN_QUERY, LOGIN_QUERY_GOOGLE } from './consultas'
import { getUserFromToken } from '@utils/authService'
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "src/boot/apollo";
// import { crearRouter, crearRutas} from '@utils/crearRouter'
export const useAuthStore = defineStore("Auth", {
    state: () => ({
        pending: false,
        isFetching: false,
        alerta : false,
        datosUsuario:{},
        avatar:'',
        getLogin: false,
        error: null,
    }),

    actions: {
        async login(credenciales) {
            const variables = ref(credenciales)
            const { loading, error, data } = provideApolloClient(apolloClient)(() => useQuery(LOGIN_QUERY,variables));

            // if (loading) return "Loading...";
          
            if (error) return `Error! ${error}`;
            console.log('data', JSON.stringify(data))
            return JSON.stringify(data)






            // await provideApolloClient(apolloClient)(() => useQuery(LOGIN_QUERY,variables)).then((result) => {
            //     console.log(result)
            // }).catch((err) => {
                
            // });
            // // const data = computed(() => (result.value = result.value?.data));
            // console.log('data', result)
            // // const { token } = data.userLogin
            // // const datos = getUserFromToken(token)
            // // console.log('data token', datos)
            // // this.datosUsuario = datos.datosUsuario
            // this.getLogin = true
            // await apolloClient.resetStore();
        },

        logout() {
            localStorage.removeItem("token")
            localStorage.removeItem("isLoadNodes")
            this.getLogin = false
        }
    },

    getters: {
        isLogin:(state) => state.getLogin,
        isError: (state) => state.error ,
        isPending: (state) => state.pending,
        datos_usuario: (state) => state.datosUsuario,
        avatar: (state) => state.avatar,
        isFetching: (state) => state.isFetching,
        alerta: (state) => state.alerta,
    }
});
