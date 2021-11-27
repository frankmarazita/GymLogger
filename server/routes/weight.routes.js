const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/weight.schema')
const controller = require('../controllers/weight.controller')

routes.get('/weight', auth.verify, controller.get)
routes.post('/weight', auth.verify, schema.logWeight, controller.logWeight)
routes.put('/weight/:id', auth.verify, schema.updateWeight, controller.updateWeight)
routes.delete('/weight/:id', auth.verify, schema.deleteWeight, controller.deleteWeight)

module.exports = routes