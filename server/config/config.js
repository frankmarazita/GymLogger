const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })

let config = {}

config.date = require('./date.config.json')
config.development = require('./development.config.json')
config.routes = require('./routes.config.json')

module.exports = config