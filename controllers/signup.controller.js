const EM = require('../constants/error_messages')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        return res.render('index', { layout: 'signup', title: 'Signup' })
    },

    signup: async function (req, res) {
        // TODO Check integrity of request
        let error = null;
        let user = new User()
        await user.loadWithEmail(req.body.email)

        if (user.valid) {
            error = EM.Auth.EmailExists
        } else if (req.body.password != req.body.confirm_password) {
            error = EM.Auth.NoMatchPassword
        }

        if (error) {
            return res.render('index', { layout: 'signup', title: 'Signup', error: error })
        }

        await user.new(req.body.email, req.body.name, req.body.password)
        req.session.user = user
        return res.redirect('/')
    }

}