const EM = require('../constants/errorMessages')

const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    new: async function (req, res) {
        let user = new User()
        await user.loadWithEmail(req.body.email)

        if (user.valid) {
            await user.authenticate(req.body.password)
            if (user.authenticated) {
                req.userID = user.id
            } else {
                return error.status(res, 401, EM.Auth.InvalidEmailPassword())
            }
        } else {
            return error.status(res, 401, EM.Auth.InvalidEmailPassword())
        }

        let token = await utility.jwt.createNewSessionToken(user.sessionData())

        return res.status(200).send({ token: token })
    }

}