const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/signup.controller')

module.exports = function () {

    app.get('/signup', auth.verifyFalse, controller.get)
    app.post('/signup', auth.verifyFalse, controller.signup)

}