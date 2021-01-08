require('dotenv').config({ path: __dirname + '/vars.env' });

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars_express = require('express-handlebars');

const db = require('./controllers/db'); // Import Database

// Initialise MongoDB

db.init(process.env.MONGODB_SECRET, process.env.DB_NAME);

// Initialise Express

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    cookie: {
        httpOnly: true,
        // secure: true,
        // domain: 'example.com'
    }
}));
// const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(express.static('public'));
const port = parseInt(process.env.PORT);

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
        },
        or: function (a, b) {
            return a || b;
        }
    }
});

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);

// Routes
require('./routes/auth')(app, urlencodedParser, db);
require('./routes/home')(app, urlencodedParser, db);
require('./routes/account')(app, urlencodedParser, db);
require('./routes/add')(app, urlencodedParser, db);
require('./routes/edit')(app, urlencodedParser, db);
require('./routes/delete')(app, urlencodedParser, db);
require('./routes/group')(app, urlencodedParser, db);
require('./routes/exercise')(app, urlencodedParser, db);
require('./routes/weight')(app, urlencodedParser, db);

const auth = require('./controllers/auth');
const error = require('./controllers/error');

// Default Route
app.use(function (req, res) {
    if (auth.verify(req, res)) {
        error.render(req, res, 404);
    }
});

app.listen(port, () => console.log(`App listening to port ${port}`));