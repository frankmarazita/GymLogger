const routes = require('express').Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/users.controller')

routes.get('/users', auth.verify, controller.get)
routes.post('/users', controller.add) // TODO implement add method
routes.put('/users', auth.verify, controller.update)

module.exports = routes