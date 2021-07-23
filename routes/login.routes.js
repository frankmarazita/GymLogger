const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/login.controller')

module.exports = function () {

    app.get('/login', auth.verifyFalse, controller.get)
    app.post('/login', auth.verifyFalse, controller.login)

}