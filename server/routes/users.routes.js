const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/users.controller')

module.exports = function () {

    app.get('/users', auth.verify, controller.get)
    app.post('/users', controller.add) // TODO implement add method
    app.put('/users', auth.verify, controller.update)

}