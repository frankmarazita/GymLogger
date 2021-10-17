const routes = require('express').Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/groups.controller')

routes.get('/groups/:id', auth.verify, controller.getGroup)
routes.post('/groups', auth.verify, controller.add)
routes.put('/groups/:id', auth.verify, controller.update)

routes.get('/groups', auth.verify, controller.getGroups)

module.exports = routes