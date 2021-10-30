const error = require('./error')
const utility = require('../utils/utility')

module.exports = {

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
    }

}