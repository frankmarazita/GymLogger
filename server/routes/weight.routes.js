const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/weight.controller')

module.exports = function () {

    app.get('/weight', auth.verify, controller.get)
    app.post('/weight', auth.verify, controller.logWeight)
    app.put('/weight/:id', auth.verify, controller.updateWeight)

}