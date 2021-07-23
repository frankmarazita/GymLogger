const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/home.controller')

module.exports = function () {

    app.get('/', auth.verify, controller.get)

}