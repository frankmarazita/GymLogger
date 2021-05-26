const config = require('./config/config');
const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';

const express = require('express');
const session = require('express-session');
const handlebars_express = require('express-handlebars');
const helmet = require("helmet");

// Initialise Express
const app = express();

// Initialise Helmet
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://www.gstatic.com", "'unsafe-inline'"],
                connectSrc: ["'self'"],
                styleSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net", "https://www.gstatic.com", "'unsafe-inline'"],
                fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
                imgSrc: ["'self'", "data:"]
            }
        },
    })
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: production,
        domain: process.env.DOMAIN
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
    helpers: require('./helpers/handlebars_helpers.js')
});

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);

module.exports = app;