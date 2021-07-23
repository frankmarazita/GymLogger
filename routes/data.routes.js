const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/data.controller')

module.exports = function () {

    app.get('/data/exercise/:id', auth.verify, controller.getExerciseData)
    app.post('/data/exercise/:id/dailyMax', auth.verify, controller.updateDailyMax)
    app.post('/data/exercise/:id/goal', auth.verify, controller.updateGoal)

}