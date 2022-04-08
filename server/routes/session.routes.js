const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/session.schema')
const controller = require('../controllers/session.controller')

routes.post('/session', schema.new, controller.new)
routes.post('/session/twoFactor', auth.verifyTwoFactor, schema.validateTwoFactor, controller.validateTwoFactor)

module.exports = routes