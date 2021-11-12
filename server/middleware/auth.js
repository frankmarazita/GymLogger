const CT = require('../constants/codeTables')

const error = require('./error')
const config = require('../config/config')
const utility = require('../utils/utility')

const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.C.Development

module.exports = {

    verify: async function (req, res, next) {
        let token = req.headers.token
        if (token) {
            let decoded = await utility.jwt.check(token)
            if (decoded) {
                if (decoded.exp < utility.date.now().getTime() / 1000) {
                    return error.status(res, 401)
                }
                req.userID = decoded.user.id
                return next()
            }
            // Session expiry override for development mode
            if (IS_DEVELOPMENT) {
                decoded = await utility.jwt.decode(token)
                if (decoded) {
                    if (config.development.sessionsExpire) {
                        return error.status(res, 401)
                    }
                    req.userID = decoded.user.id
                    return next()
                }
            }
        }
        return error.status(res, 401)
    }

}