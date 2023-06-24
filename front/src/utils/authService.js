import decode from 'jwt-decode'

export const getUserFromToken = (tokenId) => {
    return decode(tokenId)
}

export const isLogin = (userId) => {
    return userId ? true : false
}
