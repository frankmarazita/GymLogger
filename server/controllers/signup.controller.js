const EM = require('../constants/errorMessages')

const error = require('../middleware/error')

const User = require('../models/User')

module.exports = {

    signup: async function (req, res) {
        // TODO Check integrity of request
        let user = new User()
        await user.loadWithEmail(req.body.email)

        if (user.valid) {
            return error.status(req, res, 400, EM.Auth.EmailExists)
        } else if (req.body.password != req.body.confirmPassword) {
            return error.status(req, res, 400, EM.Auth.NoMatchPassword)
        }

        await user.new(req.body.email, req.body.name, req.body.password)

        let token = await jwt.createNewSessionToken(user.sessionData())

        return res.status(200).send({ token: token })
    }

}