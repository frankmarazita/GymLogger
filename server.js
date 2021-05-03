require('dotenv').config({ path: __dirname + '/.env' });

const development = process.env.NODE_ENV === 'development';

const port = parseInt(process.env.PORT);

const express = require('express');
const session = require('express-session');
const handlebars_express = require('express-handlebars');
const helmet = require("helmet");

// Import Database
const db = require('./controllers/db');

// Initialise MongoDB
db.init(process.env.MONGODB_SECRET, process.env.DB_NAME);

// Initialise Express
const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: !development,
        // domain: 'example.com'
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Initialise Handlebars
const handlebars = handlebars_express.create({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    // defaultLayout: 'default',
    helpers: require('./handlers/handlebars_helpers.js')
});

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);

// Initialise Helmet
app.use(helmet());

// Routes
require('./routes/auth')(app, db);
require('./routes/home')(app, db);
require('./routes/account')(app, db);
require('./routes/add')(app, db);
require('./routes/edit')(app, db);
require('./routes/delete')(app, db);
require('./routes/group')(app, db);
require('./routes/exercise')(app, db);
require('./routes/exercise_data')(app, db);
require('./routes/weight')(app, db);

const auth = require('./controllers/auth');
const error = require('./controllers/error');

// Default Route
app.use(function (req, res) {
    if (auth.verify(req, res)) {
        error.render(req, res, 404);
    }
});

app.listen(port, () => console.log(`App listening to port ${port}`));