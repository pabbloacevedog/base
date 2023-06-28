import axios from 'axios';

export default function setAuthorizationToken(token) {
    if(token !== undefined){
       // SE DEJA POR DEFECTO EL HEADER AUTHORIZATION CON EL TOKEN
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } 
    else {
        delete axios.defaults.headers.common['Authorization']
    }
}

