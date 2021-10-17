const routes = require('express').Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/weight.controller')

routes.get('/weight', auth.verify, controller.get)
routes.post('/weight', auth.verify, controller.logWeight)
routes.put('/weight/:id', auth.verify, controller.updateWeight)

module.exports = routes