const routes = require('express').Router()
const auth = require('../middleware/auth')
const schema = require('../schemas/exercises.schema')
const controller = require('../controllers/exercises.controller')

routes.get('/exercises/:exerciseID', auth.verify, controller.get)
routes.post('/exercises', auth.verify, schema.add, controller.add)
routes.put('/exercises/:exerciseID', auth.verify, schema.update, controller.update)
routes.delete('/exercises/:exerciseID', auth.verify, controller.delete)

routes.post('/exercises/:exerciseID/dailymax', auth.verify, schema.logDailyMax, controller.logDailyMax)
routes.post('/exercises/:exerciseID/goal', auth.verify, schema.logGoal, controller.logGoal)
routes.put('/exercises/:exerciseID/dailymax/:dailyMaxID', auth.verify, schema.updateDailyMax, controller.updateDailyMax)
routes.put('/exercises/:exerciseID/goal/:goalID', auth.verify, schema.updateGoal, controller.updateGoal)

module.exports = routes