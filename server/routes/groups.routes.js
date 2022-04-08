const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/groups.schema')
const controller = require('../controllers/groups.controller')

routes.get('/groups/:groupID', auth.verify, schema.get, controller.get)
routes.get('/groups/:groupID/exercises', auth.verify, schema.getExercises, controller.getExercises)
routes.post('/groups', auth.verify, schema.add, controller.add)
routes.put('/groups/:groupID', auth.verify, schema.update, controller.update)

routes.get('/groups', auth.verify, controller.getGroups)

module.exports = routes