const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/login.controller')

module.exports = function () {

    app.post('/login', auth.verifyFalse, controller.login)

}