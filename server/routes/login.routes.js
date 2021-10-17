const routes = require('express').Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/login.controller')

routes.post('/login', auth.verifyFalse, controller.login)

module.exports = routes