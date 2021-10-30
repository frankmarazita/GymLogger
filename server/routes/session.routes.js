const routes = require('express').Router()
const controller = require('../controllers/session.controller')

routes.post('/session', controller.new)

module.exports = routes