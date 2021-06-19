const auth = require('../controllers/auth')

module.exports = function (app, db) {

    app.get('/account', async (req, res) => {
        if (auth.verify(req, res)) {
            res.render('index', { layout: 'account', title: 'Account', user: req.session.user })
        }
    })

}