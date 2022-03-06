const twofactor = require("node-2fa")

module.exports = {

    generate: function (name, account) {
        return twofactor.generateSecret({ name: name, account: account })
    },

    check: function (secret, token) {
        return twofactor.verifyToken(secret, token)
    }
}