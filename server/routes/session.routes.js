const routes = require('express').Router()
const schema = require('../schemas/session.schema')
const controller = require('../controllers/session.controller')

routes.post('/session', schema.new, controller.new)

module.exports = routes