const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/account.controller')

module.exports = function () {

    app.get('/account', auth.verify, controller.get)

}