const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/exercise.controller')

module.exports = function () {

    app.get('/exercise/:id', auth.verify, controller.get)
    app.post('/exercise/:id/dailymax', auth.verify, controller.logDailyMax)
    app.post('/exercise/:id/goal', auth.verify, controller.logGoal)

}