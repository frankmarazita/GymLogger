const error = require('./error')
const utility = require('../utils/utility')

module.exports = {

    // TODO Rethink this method and its use / need
    verifyDefault: async function (req, res) {
        if (req.body.token) {
            if (await utility.jwt.check(req.body.token)) {
                return true
            }
        }
        return false
    },

    verify: async function (req, res, next) {
        let token = req.headers.token
        if (token) {
            let decoded = await utility.jwt.check(token)
            if (decoded) {
                if (decoded.expires) {
                    if (decoded.exp < utility.date.now().getTime() / 1000) {
                        return error.status(req, res, 401)
                    }
                }
                req.session.user = decoded.user
                return next()
            }
        }
        return error.status(req, res, 401)
    },

    // TODO Rethink this method and its use / need
    verifyFalse: async function (req, res, next) {
        if (req.body.token) {
            if (!await utility.jwt.check(req.body.token)) {
                return next()
            }
        } else {
            return next()
        }
        return res.redirect('/')
    }

}