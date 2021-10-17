const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/exercises.controller')

module.exports = function () {

    app.get('/exercises/:exerciseID', auth.verify, controller.get)
    app.post('/exercises', auth.verify, controller.add)
    app.put('/exercises/:exerciseID', auth.verify, controller.update)
    app.delete('/exercises/:exerciseID', auth.verify, controller.delete)

    app.post('/exercises/:exerciseID/dailymax', auth.verify, controller.logDailyMax)
    app.post('/exercises/:exerciseID/goal', auth.verify, controller.logGoal)
    app.put('/exercises/:exerciseID/dailymax/:dailymaxID', auth.verify, controller.updateDailyMax)
    app.put('/exercises/:exerciseID/goal/:goalID', auth.verify, controller.updateGoal)

}