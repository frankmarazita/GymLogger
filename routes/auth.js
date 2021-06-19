const bcrypt = require('../controllers/bcrypt')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.get('/signup', (req, res) => {
        if (req.session.user) {
            res.redirect('/')
        } else {
            res.render('index', { layout: 'signup', title: 'Signup' })
        }
    })

    app.post('/signup', async (req, res) => {
        let error = null
        let result = await db.get(CT.DB.Users.T, { email: req.body.email })

        if (result != null) {
            error = EM.Auth.EmailExists
        } else if (req.body.password != req.body.confirm_password) {
            error = EM.Auth.NoMatchPassword
        }

        if (error == null) {
            const password_hash = await bcrypt.hash(req.body.password)
            let result = await db.set(CT.DB.Users.T, { email: req.body.email, name: req.body.name, passwordhash: password_hash })
            req.session[CT.Session.User.T] = {
                [CT.Session.User.C.ID]: result['ops'][0]['_id'],
                [CT.Session.User.C.Email]: req.body.email,
                [CT.Session.User.C.Name]: req.body.name
            }
            res.redirect('/')
        } else {
            res.render('index', { layout: 'signup', title: 'Signup', error: error })
        }
    })

    app.get('/login', (req, res) => {
        if (req.session.user) {
            res.redirect('/')
        } else {
            res.render('index', { layout: 'login', title: 'Login' })
        }
    })

    app.post('/login', async (req, res) => {
        let error = null
        let user = await db.get(CT.DB.Users.T, { email: req.body.email })

        if (user == null) {
            error = EM.Auth.InvalidEmailPassword
        } else {
            const valid = await bcrypt.check(req.body.password, user[CT.DB.Users.C.PasswordHash])
            if (!valid) {
                error = EM.Auth.InvalidEmailPassword
            }
        }

        if (error == null) {
            req.session.user = {
                [CT.Session.User.C.ID]: user[CT.DB.Users.C.ID],
                [CT.Session.User.C.Email]: user[CT.DB.Users.C.Email],
                [CT.Session.User.C.Name]: user[CT.DB.Users.C.Name]
            }
            res.redirect('/')
        } else {
            res.render('index', { layout: 'login', title: 'Login', error: error })
        }

    })

    app.get('/logout', (req, res) => {
        delete req.session.user
        res.redirect('/login')
    })

}