const jwt = require('./jwt');

const SESSION_ATTRIBUTE_NAME = 'token';

module.exports = {

    setToken(token) {
        return sessionStorage.setItem(SESSION_ATTRIBUTE_NAME, token)
    },

    getToken() {
        return sessionStorage.getItem(SESSION_ATTRIBUTE_NAME)
    },

    deleteToken() {
        return sessionStorage.removeItem(SESSION_ATTRIBUTE_NAME)
    },

    async isLoggedIn() {
        let token = sessionStorage.getItem(SESSION_ATTRIBUTE_NAME)
        let decoded = await jwt.decode(token)
        if (decoded) {
            console.log(decoded)
            return true
        }
        return false
    }

}