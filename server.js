const config = require('./config/config')

const development = process.env.NODE_ENV === 'development';

const port = parseInt(process.env.PORT);

const express = require('express');
const session = require('express-session');
const handlebars_express = require('express-handlebars');
const helmet = require("helmet");

// Import Database
const db = require('./controllers/db');

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
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [
                    "'self'"
                ],
                scriptSrc: [
                    "'self'",
                    "https://cdnjs.cloudflare.com",
                    "https://www.gstatic.com",
                    "'unsafe-inline'" // Avoid this
                ],
                connectSrc: [
                    "'self'",
                ],
                styleSrc: [
                    "'self'",
                    "https://stackpath.bootstrapcdn.com",
                    "https://maxcdn.bootstrapcdn.com",
                    "https://maxst.icons8.com",
                    "https://www.gstatic.com",
                    "'unsafe-inline'" // Avoid this
                ],
                fontSrc: [
                    "'self'",
                    "https://maxcdn.bootstrapcdn.com",
                    "https://maxst.icons8.com"
                ],
                imgSrc: [
                    "'self'",
                    "data:" // Avoid this
                ]
            }
        },
    })
);

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

// Initialise MongoDB and Start Server
let server;
db.init(process.env.MONGODB_SECRET, process.env.DB_NAME).then(() => {
    server = app.listen(port, () => {
        console.log(`Server listening to port ${port}`)
    });
});

const exitHandler = async () => {
    server.close();
    console.info('Server Closed');
    await db.close();
    process.exit(1);
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', async () => {
    server.close();
    console.log('Server Closed');
    await db.close();
});

process.on('SIGINT', async () => {
    server.close();
    console.log('Server Closed');
    await db.close();
});