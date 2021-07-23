const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/edit.controller')

module.exports = function () {

    app.get('/edit/account', auth.verify, controller.getEditAccount)
    app.post('/edit/account', auth.verify, controller.editAccount)

    app.get('/edit/group/:id', auth.verify, controller.getEditExerciseGroup)
    app.post('/edit/group/:id', auth.verify, controller.editExerciseGroup)

    app.get('/edit/exercise/:id', auth.verify, controller.getEditExercise)
    app.post('/edit/exercise/:id', auth.verify, controller.editExercise)

}