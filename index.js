const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars_express = require('express-handlebars');

const db = require('./db') // Import Database
const bcrypt = require('./bcrypt') // Import bcrypt

// Initialise MongoDB

let databaseName = "gymlogger";
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
        let exerciseGroups = await db.getAll("exercisegroups", { user: req.session.email });
        for (let i = 0; i < exerciseGroups.length; i++) {
            let exercises = await db.getAll("exercises", { exercisegroup: String(exerciseGroups[i]._id) });
            exerciseGroups[i].numexercises = exercises.length;
        }
        res.render('index', { layout: 'main', title: 'Main', name: req.session.name, exerciseGroups: exerciseGroups});
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
        req.session.email = req.body.email;
        req.session.name = req.body.name;
        res.redirect('/');
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

app.get('/logout', (req, res) => {
    delete req.session.email;
    delete req.session.name;
    res.redirect('/login');
});

app.get('/add/:item', async (req, res) => {
    if (auth(req, res)) {
        switch (req.params.item) {
            case 'group': {
                res.render('index', { layout: 'add', title: 'Add Exercise Group', type: req.params.item });
                break;
            }
            case 'exercise': {
                let exerciseGroups = await db.getAll("exercisegroups", { user: req.session.email });
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
                group.user = req.session.email;
                group.name = req.body.name;
                group.note = req.body.note;
                let exercise = await db.set("exercisegroups", group);
                res.redirect('/group/' + exercise.insertedId);
                break;
            }
            case 'exercise': {
                // TODO Check integrity of request
                // Check user owns that group
                let exercise = {};
                exercise.exercisegroup = req.body.exercisegroup;
                exercise.name = req.body.name;
                exercise.note = req.body.note;
                exercise = await db.set("exercises", exercise);
                res.redirect('/exercise/' + exercise.insertedId);
                break;
            }
            default: {
                error(req, res, 404);
                break;
            }
        }
    }
});

app.get('/edit/:item/:_id', async (req, res) => {
    if (auth(req, res)) {
        switch (req.params.item) {
            case 'group': {
                let exerciseGroup = await db.get("exercisegroups", req.params._id, true);
                if (exerciseGroup) {
                    if (exerciseGroup.user == req.session.email) {
                        res.render('index', { layout: 'edit', title: 'Edit Exercise Group', type: req.params, exerciseGroup: exerciseGroup });
                    } else {
                        error(req, res, 403);
                    }
                } else {
                    error(req, res, 404);
                }
                break;
            }
            case 'exercise': {
                let exercise = await db.get("exercises", req.params._id, true)
                if (exercise) {
                    let exerciseGroup = await db.get("exercisegroups", exercise.exercisegroup, true);
                    if (exerciseGroup.user == req.session.email) {
                        res.render('index', { layout: 'edit', title: 'Edit Exercise', type: req.params, exercise: exercise });
                    } else {
                        error(req, res, 403);
                    }
                } else {
                    error(req, res, 404);
                }
                break;
            }
            default: {
                error(req, res, 404);
                break;
            }
        }
    }
});

app.post('/edit/:item/:_id', urlencodedParser, async (req, res) => {
    if (auth(req, res)) {
        switch (req.params.item) {
            case 'group': {
                // TODO Check integrity of request
                // Check user owns that group
                let group = {};
                group.name = req.body.name;
                group.note = req.body.note;
                await db.update("exercisegroups", req.params._id, group, true);
                res.redirect('/group/' + req.params._id);
                break;
            }
            case 'exercise': {
                // TODO Check integrity of request
                // Check user owns that exercise
                let exercise = {};
                exercise.name = req.body.name;
                exercise.note = req.body.note;
                await db.update("exercises", req.params._id, exercise, true);
                res.redirect('/exercise/' + req.params._id);
                break;
            }
            default: {
                error(req, res, 404);
                break;
            }
        }
    }
});

app.post('/delete/:item/:_id', urlencodedParser, async (req, res) => {
    if (auth(req, res)) {
        switch (req.params.item) {
            case 'group': {
                // console.log(req.params);
                break;
            }
            case 'exercise': {
                let result = await db.get("exercises", req.params._id, true);
                await db.delete("exercises", req.params._id, true);
                res.status(200).send({ url: '/group/' + result.exercisegroup })
                break;
            }
            default: {
                error(req, res, 404);
                break;
            }
        }
    }
});

app.get('/group/:_id', async (req, res) => {
    if (auth(req, res)) {
        let exerciseGroup = await db.get("exercisegroups", req.params._id, true);
        if (exerciseGroup) {
            if (exerciseGroup.user == req.session.email) {
                let exercises = await db.getAll("exercises", { exercisegroup: String(exerciseGroup._id) });
                res.render('index', { layout: 'group', title: exerciseGroup.name, exerciseGroup: exerciseGroup, exercises: exercises });
            } else {
                error(req, res, 403);
            }
        } else {
            error(req, res, 404);
        }
    }
});

app.get('/exercise/:_id', async (req, res) => {
    if (auth(req, res)) {
        let exercise = await db.get("exercises", req.params._id, true);
        if (exercise) {
            let exerciseGroup = await db.get("exercisegroups", exercise.exercisegroup, true);
            if (exerciseGroup.user == req.session.email) {
                res.render('index', { layout: 'exercise', title: exercise.name, exercise: exercise });
            } else {
                error(req, res, 403);
            }
        } else {
            error(req, res, 404);
        }
    }
});

// Default page not found
app.use(function (req, res) {
    if (auth(req, res)) {
        error(req, res, 404);
    }
});

app.listen(port, () => console.log(`App listening to port ${port}`));