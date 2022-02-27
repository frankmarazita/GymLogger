const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })
const lodash = require('lodash')

const CT = require('../constants/codeTables')

let config = {}

config.date = require('./date.config.json')
config.development = require('./development.config.json')
config.joi = require('./joi.config.json')
config.jwt = require('./jwt.config.json')
config.logger = require('./logger.config.json')
config.production = require('./production.config.json')
config.routes = require('./routes.config.json')
config.system = require('./system.config.json')

const configOverride = process.env.CONFIG_OVERRIDE
const configOverrideFolder = process.env.CONFIG_OVERRIDE_FOLDER || ''
const configOverrideFile = configOverrideFolder + '/config.override'

// Load Config Overrides
if (configOverride === CT.Boolean.True) {
    if (configOverrideFolder) {
        try {
            const configOverride = require(configOverrideFile)
            lodash.merge(config, configOverride)
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = config