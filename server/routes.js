const app = require('./app')

const CT = require('./constants/codeTables')

const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.C.Development

if (IS_DEVELOPMENT) {
    app.use(function (req, res, next) {
        console.log(req.path)
        next()
    })
}

require('./routes/exercises.routes')()
require('./routes/groups.routes')()
require('./routes/login.routes')()
require('./routes/signup.routes')()
require('./routes/users.routes')()
require('./routes/weight.routes')()

require('./routes/error.routes')()