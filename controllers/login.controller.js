const EM = require('../constants/error_messages')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        return res.render('index', { layout: 'login', title: 'Login' })
    },

    login: async function (req, res) {
        let error = null;
        let user = new User()
        await user.loadWithEmail(req.body.email)

        if (user.valid) {
            await user.authenticate(req.body.password)
            if (user.authenticated) {
                req.session.user = user
            } else {
                error = EM.Auth.InvalidEmailPassword
            }
        } else {
            error = EM.Auth.InvalidEmailPassword
        }

        if (error === null) {
            return res.redirect('/')
        }

        return res.render('index', { layout: 'login', title: 'Login', error: error })
    }

}