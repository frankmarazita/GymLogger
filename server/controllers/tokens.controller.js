const EM = require('../constants/errorMessages')

const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')
const Token = require('../models/Token')

authenticateUser = async function (user, password, res) {
    await user.authenticate(password)
    if (!user.authenticated) {
        return error.status(res, 401, EM.Auth.InvalidPassword())
    }
    return null
}

validateToken = async function (user, userToken, res) {
    if (!userToken.valid || String(userToken.user) !== String(user.id)) {
        return error.status(res, 401, EM.Auth.InvalidPersonalAccessTokenID())
    }
    return null
}

module.exports = {

    get: async function (req, res) {
        let userID = req.userID
        let tokenID = req.params.tokenID

        let user = new User()
        await user.loadWithID(userID)

        let token = new Token()
        await token.loadWithID(tokenID)

        if (await validateToken(user, token, res)) return

        return res.status(200).send({ token: token })
    },

    add: async function (req, res) {
        const userID = req.userID
        const password = req.body.password
        const expiry = utility.date.stringToDate(req.body.expiry)
        const note = req.body.note
        const scope = req.body.scope

        let user = new User()
        await user.loadWithID(userID)

        if (await authenticateUser(user, password, res)) return

        let userToken = new Token()
        await userToken.new(user.id, expiry, note, scope)
        let token = await utility.jwt.createNewSessionToken(user.sessionData(), userToken.sessionData(), expiry)

        return res.status(200).send({ token: token })
    },

    update: async function (req, res) {
        const userID = req.userID
        const password = req.body.password
        const tokenID = req.params.tokenID
        // const expiry = utility.date.stringToDate(req.body.expiry)
        const enabled = req.body.enabled
        // const note = req.body.note

        let user = new User()
        await user.loadWithID(userID)

        if (await authenticateUser(user, password, res)) return

        let userToken = new Token()
        await userToken.loadWithID(tokenID)

        if (await validateToken(user, userToken, res)) return

        if (enabled != null && enabled != undefined && enabled != userToken.enabled) {
            await userToken.updateEnabled(enabled)
        }

        // TODO How should a new token be reissued when the user changes the expiry date?
        // let token = await utility.jwt.createNewSessionToken(user.sessionData(), userToken.sessionData(), expiry)

        return res.status(204).send()
    },

    delete: async function (req, res) {
        const userID = req.userID
        const password = req.body.password
        const tokenID = req.params.tokenID

        let user = new User()
        await user.loadWithID(userID)

        if (await authenticateUser(user, password, res)) return

        let userToken = new Token()
        await userToken.loadWithID(tokenID)

        if (await validateToken(user, userToken, res)) return

        await userToken.delete()
        return res.status(204).send()
    }

}