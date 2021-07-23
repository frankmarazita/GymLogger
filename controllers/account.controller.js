const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let user = new User()
        await user.loadWithID(req.session.user.id)
        return res.render('index', { layout: 'account', title: 'Account', user: user })
    }

}