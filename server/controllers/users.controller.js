const EM = require('../constants/errorMessages')

const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let userID = req.userID

        let user = new User()

        await user.loadWithID(userID)
        return res.status(200).send({ user: user })
    },

    add: async function (req, res) {

        let email = req.body.email
        let password = req.body.password
        let confirmPassword = req.body.confirmPassword
        let name = req.body.name

        let user = new User()
        await user.loadWithEmail(email)

        if (user.valid) {
            return error.status(res, 400, EM.Auth.EmailExists)
        } else if (password != confirmPassword) {
            return error.status(res, 400, EM.Auth.NoMatchPassword)
        }

        await user.new(email, name, password)

        let token = await utility.jwt.createNewSessionToken(user.sessionData())

        return res.status(201).send({ token: token })
    },

    update: async function (req, res) {
        let userID = req.userID
        let email = req.body.email
        let name = req.body.name

        let user = new User()
        await user.loadWithID(userID)

        if (email && user.email != email) {
            let userEmailExists = new User()
            await userEmailExists.loadWithEmail(email)
            if (userEmailExists.valid) {
                return error.status(res, 400, EM.Auth.EmailExists)
            }

            await user.updateEmail(email)
        }

        if (name && user.name != name) {
            await user.updateName(name)
        }

        await user.reload()
        req.session.user = user
        return res.status(204).send()
    }

}