const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars_express = require('express-handlebars');

const db = require('./db') // Import Database
const bcrypt = require('./bcrypt') // Import bcrypt

// Initialise MongoDB

let databaseName = "gymlog";
db.init(process.env.MONGODB_SECRET, databaseName);

// Initialise Express

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    key: 'myCookieSessionId',
    cookie: {
        httpOnly: true,
        // secure: true,
        // domain: 'example.com'
    }
}));
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(express.static('public'));
const port = 3000;

// Initialise Handlebars

const handlebars = handlebars_express.create({
    // defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    helpers: {
        equals: function (a, b) {
            return a == b;
        },
        greater: function (a, b) {
            return a > b;
        }
    }
});

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);

// Requests

function auth(req, res) {
    if (!req.session.email) {
        res.redirect('/login');
        return false;
    }
    return true;
}

function error(req, res, code) {
    let message = null;
    switch (code) {
        case 403:
            message = "Resource Forbidden"
            break;
        case 404:
            message = "Page Not Found"
            break;
        default:
            break;
    }
    res.render('index', { layout: 'error', title: 'Error', code: code, message: message});
}

app.get('/', async (req, res) => {
    if (auth(req, res)) {
        let result = await db.get("users", { _id: req.session.email });
        let exerciseGroups = [];
        if ('exercisegroups' in result) {
            for (const element of result['exercisegroups']) {
                let exerciseGroup = await db.get("exercisegroups", element, true);
                exerciseGroups.push(exerciseGroup);
            };
        }
        res.render('index', { layout: 'main', title: 'Main', name: req.session.name, exerciseGroups: exerciseGroups });
    }
});

app.get('/signup', (req, res) => {
    if (req.session.email) {
        res.redirect('/');
    } else {
        res.render('index', { layout: 'signup', title: 'Signup' });
    }
});

app.post('/signup', urlencodedParser, async (req, res) => {
    let error = null;
    let result = await db.get("users", { _id: req.body.email });

    if (result != null) {
        error = "Email already in use"
    } else if (req.body.password != req.body.confirm_password) {
        error = "Passwords do not match"
    }

    if (error == null) {
        const password_hash = await bcrypt.hash(req.body.password);
        await db.set("users", { _id: req.body.email, name: req.body.name, passwordhash: password_hash });
        res.render('index', { layout: 'login', title: 'Login' });
    } else {
        res.render('index', { layout: 'signup', title: 'Signup', error: error });
    }
});

app.get('/login', (req, res) => {
    if (req.session.email) {
        res.redirect('/');
    } else {
        res.render('index', { layout: 'login', title: 'Login' });
    }
});

app.post('/login', urlencodedParser, async (req, res) => {
    let error = null;
    let result = await db.get("users", { _id: req.body.email });

    if (result == null) {
        error = "Incorrect Email or Password"
    } else {
        const valid = await bcrypt.check(req.body.password, result['passwordhash']);
        if (!valid) {
            error = "Incorrect Email or Password"
        }
    }

    if (error == null) {
        req.session.email = result['_id'];
        req.session.name = result['name'];
        res.redirect('/');
    } else {
        res.render('index', { layout: 'login', title: 'Login', error: error });
    }

});

app.get('/add/:item', async (req, res) => {
    if (auth(req, res)) {
        switch (req.params.item) {
            case 'group': {
                res.render('index', { layout: 'add', title: 'Add Exercise Group', type: req.params.item });
                break;
            }
            case 'exercise': {
                let result = await db.get("users", { _id: req.session.email });
                let exerciseGroups = [];
                if ('exercisegroups' in result) {
                    for (const element of result['exercisegroups']) {
                        let exerciseGroup = await db.get("exercisegroups", element, true);
                        exerciseGroups.push(exerciseGroup);
                    };
                }
                res.render('index', { layout: 'add', title: 'Add Exercise', type: req.params.item, exerciseGroups: exerciseGroups });
                break;
            }
            default: {
                error(req, res, 404);
                break;
            }
        }
    }
});

app.post('/add/:item', urlencodedParser, async (req, res) => {
    if (auth(req, res)) {
        switch (req.params.item) {
            case 'group': {
                // TODO Check integrity of request
                let group = {};
                group.name = req.body.name;
                group.note = req.body.note;
                group.exercises = [];
                let result = await db.set("exercisegroups", group);
                result = await db.update("users", req.session.email, "exercisegroups", result.insertedId);
                res.redirect('/group/' + result.insertedId);
                break;
            }
            case 'exercise': {
                // TODO Check integrity of request
                // Check user owns that group
                let exercise = {};
                exercise.name = req.body.name;
                exercise.note = req.body.note;
                let result = await db.set("exercise", exercise);
                result = await db.update("exercisegroups", req.body.exercisegroup, "exercises", result.insertedId, true);
                res.redirect('/exercise/' + result.insertedId);
                break;
            }
            default: {
                error(req, res, 404);
                break;
            }
        }
    }
});

app.use(function (req, res) {
    if (auth(req, res)) {
        error(req, res, 404);
    }
});

app.listen(port, () => console.log(`App listening to port ${port}`));