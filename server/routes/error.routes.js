const app = require('../app')
const error = require('../middleware/error')

module.exports = function () {

    app.use(function (req, res, next) {
        return error.status(res, 404)
    })

}