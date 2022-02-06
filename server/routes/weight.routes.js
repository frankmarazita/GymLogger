const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/weight.schema')
const controller = require('../controllers/weight.controller')

routes.get('/weight', auth.verify, controller.get)
routes.post('/weight', auth.verify, schema.add, controller.add)
routes.put('/weight/:weightID', auth.verify, schema.update, controller.update)
routes.delete('/weight/:weightID', auth.verify, schema.delete, controller.delete)

module.exports = routes