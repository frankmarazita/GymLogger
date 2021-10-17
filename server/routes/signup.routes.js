const routes = require('express').Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/signup.controller')

routes.post('/signup', auth.verifyFalse, controller.signup)

module.exports = routes