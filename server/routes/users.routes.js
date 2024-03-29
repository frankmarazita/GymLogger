const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/users.schema')
const controller = require('../controllers/users.controller')

routes.get('/users', auth.verify, controller.get)
routes.post('/users', schema.add, controller.add)
routes.put('/users', auth.verify, schema.update, controller.update)

routes.put('/users/password', auth.verify, schema.updatePassword, controller.updatePassword)
routes.post('/users/twoFactor', auth.verify, schema.enableTwoFactor, controller.enableTwoFactor)
routes.delete('/users/twoFactor', auth.verify, schema.disableTwoFactor, controller.disableTwoFactor)

module.exports = routes