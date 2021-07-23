const app = require('../app')
const controller = require('../controllers/logout.controller')

module.exports = function () {

    app.get('/logout', controller.get)

}