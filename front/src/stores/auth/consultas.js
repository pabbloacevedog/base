import gql from 'graphql-tag'

export const LOGIN_QUERY = gql`
    query userLogin($email: String!, $password: String!){
        userLogin(email: $email, password: $password){
          token: token
        }
    }
`

export const LOGIN_QUERY_GOOGLE = gql`
    query userLoginGoogle($token: String!){
        userLoginGoogle(token: $token){
          token: token
        }
    }
`
export const USUARIOS_QUERY = gql`
    query Usuarios {
        Usuarios {
            usuario_id
            nombre
            usuario
            password
            email
            verificado
            fecha_creacion
            fecha_actualizacion
            estado
        }
    }
`