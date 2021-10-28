const CT = require('./constants/codeTables')

const IS_PRODUCTION = process.env.NODE_ENV === CT.System.C.Production
const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.C.Development

const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const cors = require('cors')

// Initialise Express
const app = express()

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
)

app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: IS_PRODUCTION,
        domain: process.env.DOMAIN
    }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

module.exports = app