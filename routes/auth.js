const bcrypt = require('../controllers/bcrypt');

module.exports = function (app, urlencodedParser, db) {

    app.get('/signup', (req, res) => {
        if (req.session.user) {
            res.redirect('/');
        } else {
            res.render('index', { layout: 'signup', title: 'Signup' });
        }
    });

    app.post('/signup', urlencodedParser, async (req, res) => {
        let error = null;
        let result = await db.get("users", { email: req.body.email });

        if (result != null) {
            error = "Email already in use"
        } else if (req.body.password != req.body.confirm_password) {
            error = "Passwords do not match"
        }

        if (error == null) {
            const password_hash = await bcrypt.hash(req.body.password);
            let result = await db.set("users", { email: req.body.email, name: req.body.name, passwordhash: password_hash });
            req.session.user = {
                _id: result['ops'][0]['_id'],
                email: req.body.email,
                name: req.body.name
            };
            res.redirect('/');
        } else {
            res.render('index', { layout: 'signup', title: 'Signup', error: error });
        }
    });

    app.get('/login', (req, res) => {
        if (req.session.user) {
            res.redirect('/');
        } else {
            res.render('index', { layout: 'login', title: 'Login' });
        }
    });

    app.post('/login', urlencodedParser, async (req, res) => {
        let error = null;
        let result = await db.get("users", { email: req.body.email });

        if (result == null) {
            error = "Incorrect Email or Password"
        } else {
            const valid = await bcrypt.check(req.body.password, result['passwordhash']);
            if (!valid) {
                error = "Incorrect Email or Password"
            }
        }

        if (error == null) {
            req.session.user = {
                _id: result['_id'],
                email: result['email'],
                name: result['name']
            };
            res.redirect('/');
        } else {
            res.render('index', { layout: 'login', title: 'Login', error: error });
        }

    });

    app.get('/logout', (req, res) => {
        delete req.session.user;
        res.redirect('/login');
    });

}