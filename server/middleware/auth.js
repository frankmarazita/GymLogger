const CT = require('../constants/codeTables')
const EM = require('../constants/errorMessages')

const error = require('./error')
const utility = require('../utils/utility')

async function verifyCommon(req, res, next, twoFactorCheck = true) {
    let token = req.headers.authorization
    if (token.startsWith(CT.System.Bearer)) {
        token = token.slice(CT.System.Bearer.length + 1, token.length)
    }
    if (token) {
        let decoded = await utility.jwt.check(token)
        if (decoded) {
            if (decoded.exp < utility.date.now().getTime() / 1000) {
                return error.status(res, 401)
            }
            if (twoFactorCheck && decoded.user.twoFactorEnabled && !decoded.user.twoFactorValidated) {
                return error.status(res, 401, EM.Auth.TwoFactorNotValidated())
            }
            req.userID = decoded.user.id
            return next()
        }
    }
    return error.status(res, 401)
}

module.exports = {

    verify: async function (req, res, next) {
        await verifyCommon(req, res, next)
    },

    verifyTwoFactor: async function (req, res, next) {
        await verifyCommon(req, res, next, false)
    }

}