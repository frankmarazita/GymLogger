const CT = require('./constants/codeTables')

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