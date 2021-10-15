const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/exercises.controller')

module.exports = function () {

    app.get('/exercises/:id', auth.verify, controller.get)
    app.post('/exercises', auth.verify, controller.add)
    app.put('/exercises/:id', auth.verify, controller.update)
    app.delete('/exercises/:id', auth.verify, controller.delete)

    app.post('/exercises/:id/dailymax', auth.verify, controller.logDailyMax)
    app.post('/exercises/:id/goal', auth.verify, controller.logGoal)
    app.put('/exercises/:id/dailymax', auth.verify, controller.updateDailyMax)
    app.put('/exercises/:id/goal', auth.verify, controller.updateGoal)

}