const routes = require('express').Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/exercises.controller')

routes.get('/exercises/:exerciseID', auth.verify, controller.get)
routes.post('/exercises', auth.verify, controller.add)
routes.put('/exercises/:exerciseID', auth.verify, controller.update)
routes.delete('/exercises/:exerciseID', auth.verify, controller.delete)

routes.post('/exercises/:exerciseID/dailymax', auth.verify, controller.logDailyMax)
routes.post('/exercises/:exerciseID/goal', auth.verify, controller.logGoal)
routes.put('/exercises/:exerciseID/dailymax/:dailymaxID', auth.verify, controller.updateDailyMax)
routes.put('/exercises/:exerciseID/goal/:goalID', auth.verify, controller.updateGoal)

module.exports = routes