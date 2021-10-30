const EM = require('../constants/errorMessages')

const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let user = new User()
        await user.loadWithID(req.session.user.id)
        return res.status(200).send({ user: user })
    },

    add: async function (req, res) {
        // TODO Check integrity of request
        let user = new User()
        await user.loadWithEmail(req.body.email)

        if (user.valid) {
            return error.status(req, res, 400, EM.Auth.EmailExists)
        } else if (req.body.password != req.body.confirmPassword) {
            return error.status(req, res, 400, EM.Auth.NoMatchPassword)
        }

        await user.new(req.body.email, req.body.name, req.body.password)

        let token = await utility.jwt.createNewSessionToken(user.sessionData())

        return res.status(201).send({ token: token })
    },

    update: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let email = req.body.email
        let name = req.body.name

        let user = new User()
        await user.loadWithID(userID)

        if (user.email != email) {
            let userEmailExists = new User()
            await userEmailExists.loadWithEmail(email)
            if (userEmailExists.valid) {
                return error.status(req, res, 403, EM.Auth.EmailExists)
            }
        }

        if (user.email != email) {
            await user.updateEmail(email)
        }
        if (user.name != name) {
            await user.updateName(name)
        }

        await user.reload()
        req.session.user = user
        return res.status(204).send()
    }

}