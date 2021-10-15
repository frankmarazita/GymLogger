const app = require('../app')
const auth = require('../middleware/auth')
const controller = require('../controllers/groups.controller')

module.exports = function () {

    app.get('/groups/:id', auth.verify, controller.getGroup)
    app.post('/groups', auth.verify, controller.add)
    app.put('/groups/:id', auth.verify, controller.update)

    app.get('/groups', auth.verify, controller.getGroups)

}