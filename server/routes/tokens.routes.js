const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/tokens.schema')
const controller = require('../controllers/tokens.controller')

routes.get('/tokens/:tokenID', auth.verify, schema.get, controller.get)
routes.post('/tokens', auth.verify, schema.add, controller.add)
routes.put('/tokens/:tokenID', auth.verify, schema.update, controller.update)
routes.delete('/tokens/:tokenID', auth.verify, schema.delete, controller.delete)

// TODO Get all tokens for a user

module.exports = routes