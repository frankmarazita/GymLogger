const SESSION_ATTRIBUTE_NAME = 'token';

let session = {

    setToken: function (token) {
        return sessionStorage.setItem(SESSION_ATTRIBUTE_NAME, token)
    },

    getToken: function () {
        return sessionStorage.getItem(SESSION_ATTRIBUTE_NAME)
    },

    deleteToken: function () {
        return sessionStorage.removeItem(SESSION_ATTRIBUTE_NAME)
    }

}

export default session;