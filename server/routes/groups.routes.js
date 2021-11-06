const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/groups.schema')
const controller = require('../controllers/groups.controller')

routes.get('/groups/:id', auth.verify, controller.getGroup)
routes.post('/groups', auth.verify, schema.add, controller.add)
routes.put('/groups/:id', auth.verify, schema.update, controller.update)

routes.get('/groups', auth.verify, controller.getGroups)

module.exports = routes