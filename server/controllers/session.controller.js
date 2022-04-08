const EM = require('../constants/errorMessages')

const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    new: async function (req, res) {
        const email = req.body.email
        const password = req.body.password

        let user = new User()
        await user.loadWithEmail(email)

        if (!user.valid) {
            return error.status(res, 401, EM.Auth.InvalidEmailPassword())
        }

        await user.authenticate(password)

        if (!user.authenticated) {
            return error.status(res, 401, EM.Auth.InvalidEmailPassword())
        }

        let token = await utility.jwt.createNewSessionToken(user.sessionData())

        return res.status(200).send({ token: token })
    },

    validateTwoFactor: async function (req, res) {
        const userID = req.userID
        const twoFactorToken = req.body.twoFactorToken

        let user = new User()
        await user.loadWithID(userID)

        if (!user.valid) {
            return error.status(res, 401, EM.Auth.InvalidUser())
        }

        if (!user.twoFactorEnabled) {
            return error.status(res, 401, EM.Auth.TwoFactorNotEnabled())
        }

        await user.authenticateTwoFactor(twoFactorToken)

        if (!user.authenticated) {
            return error.status(res, 401, EM.Auth.InvalidTwoFactorToken())
        }

        let twoFactorValidated = user.authenticated
        let token = await utility.jwt.createNewSessionToken(user.sessionData(twoFactorValidated))

        return res.status(200).send({ token: token })
    }

}