const CT = require('./constants/codeTables')

const IS_PRODUCTION = process.env.NODE_ENV === CT.System.Production
const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.Development

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Initialise Express
const app = express()

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

module.exports = app