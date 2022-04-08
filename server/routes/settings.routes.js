const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/settings.schema')
const controller = require('../controllers/settings.controller')

routes.get('/settings', auth.verify, controller.get)
routes.put('/settings', auth.verify, schema.update, controller.update)

module.exports = routes