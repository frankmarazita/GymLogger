const EM = require('../constants/errorMessages')

const config = require('../config/config')
const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let user = new User()
        await user.loadWithID(req.userID)
        return res.status(200).send({ user: user })
    },

    add: async function (req, res) {  
        if (config.system.allowRegistration === false) {
            return error.status(res, 403, EM.Auth.RegistrationDisabled)
        }
      
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        const name = req.body.name

        let user = new User()
        await user.loadWithEmail(email)

        if (user.valid) {
            return error.status(res, 400, EM.Auth.EmailExists())
        } else if (password != confirmPassword) {
            return error.status(res, 400, EM.Auth.NoMatchPassword())
        }

        await user.new(email, name, password)

        let token = await utility.jwt.createNewSessionToken(user.sessionData())

        return res.status(201).send({ token: token })
    },

    update: async function (req, res) {
        const userID = req.userID
        const email = req.body.email
        const name = req.body.name

        let user = new User()
        await user.loadWithID(userID)

        if (email && user.email != email) {
            let userEmailExists = new User()
            await userEmailExists.loadWithEmail(email)
            if (userEmailExists.valid) {
                return error.status(res, 400, EM.Auth.EmailExists())
            }

            await user.updateEmail(email)
        }

        if (name && user.name != name) {
            await user.updateName(name)
        }

        return res.status(204).send()
    },

    updatePassword: async function (req, res) {
        const userID = req.userID
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        const confirmPassword = req.body.confirmPassword

        let user = new User()
        await user.loadWithID(userID)

        if (!user.valid) {
            return error.status(res, 401, EM.Auth.InvalidUser())
        }

        await user.authenticate(oldPassword)

        if (!user.authenticated) {
            return error.status(res, 401, EM.Auth.InvalidOldPassword())
        }

        if (newPassword != confirmPassword) {
            return error.status(res, 400, EM.Auth.NoMatchPassword())
        }

        await user.updatePassword(newPassword)

        return res.status(204).send()
    },

    enableTwoFactor: async function (req, res) {
        const userID = req.userID
        const password = req.body.password

        let user = new User()
        await user.loadWithID(userID)

        if (!user.valid) {
            return error.status(res, 401, EM.Auth.InvalidUser())
        }

        await user.authenticate(password)

        if (!user.authenticated) {
            return error.status(res, 401, EM.Auth.InvalidPassword())
        }

        if (user.twoFactorEnabled) {
            return error.status(res, 400, EM.Auth.TwoFactorAlreadyEnabled())
        }

        let twoFactor = utility.totp.generate(config.system.name, user.email)
        await user.setTwoFactorSecret(twoFactor.secret)

        return res.status(200).send(twoFactor)
    },

    disableTwoFactor: async function (req, res) {
        const userID = req.userID
        const password = req.body.password
        const twoFactorToken = req.body.twoFactorToken

        let user = new User()
        await user.loadWithID(userID)

        if (!user.valid) {
            return error.status(res, 401, EM.Auth.InvalidUser())
        }

        await user.authenticate(password)

        if (!user.authenticated) {
            return error.status(res, 401, EM.Auth.InvalidPassword())
        }

        if (!user.twoFactorEnabled) {
            return error.status(res, 400, EM.Auth.TwoFactorNotEnabled())
        }

        await user.authenticateTwoFactor(twoFactorToken)

        if (!user.authenticated) {
            return error.status(res, 401, EM.Auth.InvalidTwoFactorToken())
        }

        await user.disableTwoFactor()

        return res.status(204).send()
    }
}