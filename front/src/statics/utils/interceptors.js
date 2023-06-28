import axios from 'axios'
import store from '../../store'

// FUNCIÓN QUE PERMITE INTERCEPTAR LOS ERRORES DE AUTORIZACIÓN Y VUELVE AL LOGIN.
export default function interceptors() {
    axios.interceptors.response.use((response) => response, ({response}) => {
        
        
        if (response.data === "invalid token" && response.config && !response.config.__isRetryRequest) {
            console.log(response.status, response.statusText)                     
            
            store().dispatch("Auth/logout",{}).then(res => {
                // outer.push('/')
                location.reload()
            }).catch(err => {
                console.error("ERROR: ", err)
                
            })
        }
    })
}