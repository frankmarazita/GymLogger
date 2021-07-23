const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/add.controller')

module.exports = function () {

    app.get('/add/group', auth.verify, controller.getAddGroup)
    app.post('/add/group', auth.verify, controller.addGroup)

    app.get('/add/exercise', auth.verify, controller.getAddExercise)
    app.post('/add/exercise', auth.verify, controller.addExercise)

}