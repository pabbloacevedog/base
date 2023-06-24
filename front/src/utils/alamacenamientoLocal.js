import CryptoJS from 'crypto-js'

export const setLocalStorage = (nombre, objeto) => {
    console.log(process.env.PASS_LOCAL_STORAGE)
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(objeto), process.env.PASS_LOCAL_STORAGE);
    localStorage.setItem(nombre, encrypted)
}

export const getLocalStorage = (nombre) => {
    let valor = localStorage.getItem(nombre)
    if (valor){
        let decrypted = CryptoJS.AES.decrypt(valor, process.env.PASS_LOCAL_STORAGE);
        let passDecryp = decrypted.toString(CryptoJS.enc.Utf8)
        return JSON.parse(passDecryp)
    }
}
