const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/delete.controller')

module.exports = function () {

    app.delete('/delete/group/:id', auth.verify, controller.deleteGroup)
    app.delete('/delete/exercise/:id', auth.verify, controller.deleteExercise)

}