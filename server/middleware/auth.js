const CT = require('../constants/codeTables')
const EM = require('../constants/errorMessages')

const error = require('./error')
const utility = require('../utils/utility')
const schema = require('../schemas/auth.schema')

const Token = require('../models/Token')

async function verifyCommon(req, res, next, twoFactorCheck = true) {

    const result = await schema.verifyCommon(req, res, next)

    if (result !== true) {
        return result
    }

    let token = req.headers.authorization

    if (token.startsWith(CT.System.Bearer)) {
        token = token.slice(CT.System.Bearer.length + 1, token.length)
    }

    if (token) {
        let decoded = await utility.jwt.check(token)
        if (decoded) {
            if (decoded.exp < utility.date.now().getTime() / 1000) {
                return error.status(res, 401, EM.Auth.TokenExpired())
            }
            if (twoFactorCheck && decoded.user.twoFactorEnabled && !decoded.user.twoFactorValidated) {
                return error.status(res, 401, EM.Auth.TwoFactorNotValidated())
            }
            if (decoded.personalAccessToken) {
                return await validatePersonalAccessToken(req, res, next, decoded)
            }
            req.userID = decoded.user.id
            return next()
        }
    }

    return error.status(res, 401)
}

async function validatePersonalAccessToken(req, res, next, decoded) {
    let token = new Token()
    await token.loadWithID(decoded.personalAccessToken.id)

    if (token.valid) {
        if (!token.enabled) {
            return error.status(res, 401, EM.Auth.PersonalAccessTokenDisabled())
        }

        let requestedMethod = req.method
        if (token.scope.allowedHttpMethods && token.scope.allowedHttpMethods.length > 0) {
            if (token.scope.allowedHttpMethods.indexOf(requestedMethod) === -1) {
                return error.status(res, 401, EM.Auth.InvalidHttpMethod(requestedMethod))
            }
        }

        let requestedRoute = req.originalUrl

        if (token.scope.allowedRoutes && token.scope.allowedRoutes.length > 0) {
            let allowed = false
            for (let i = 0; i < token.scope.allowedRoutes.length; i++) {
                let allowedRoute = token.scope.allowedRoutes[i]
                if (allowedRoute === requestedRoute || requestedRoute.startsWith(allowedRoute + '/')) {
                    allowed = true
                    break
                }
            }
            if (!allowed) {
                return error.status(res, 401, EM.Auth.InvalidRoute(requestedRoute))
            }
        }

        if (token.scope.disallowedRoutes && token.scope.disallowedRoutes.length > 0) {
            for (let i = 0; i < token.scope.disallowedRoutes.length; i++) {
                let disallowedRoute = token.scope.disallowedRoutes[i]
                if (requestedRoute === disallowedRoute || requestedRoute.startsWith(disallowedRoute + '/')) {
                    return error.status(res, 401, EM.Auth.InvalidRoute(requestedRoute))
                }
            }
        }

        req.userID = decoded.user.id
        return next()
    }

    return error.status(res, 401, EM.Auth.InvalidPersonalAccessToken())
}

module.exports = {

    verify: async function (req, res, next) {
        return await verifyCommon(req, res, next)
    },

    verifyTwoFactor: async function (req, res, next) {
        return await verifyCommon(req, res, next, false)
    }

}