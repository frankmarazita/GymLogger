const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/group.controller')

module.exports = function () {

    app.get('/group/:id', auth.verify, controller.get)

}