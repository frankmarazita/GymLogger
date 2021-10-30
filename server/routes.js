const CT = require('./constants/codeTables')

const app = require('./app')
const config = require('./config/config')

const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.C.Development

app.use(function (req, res, next) {
    if (IS_DEVELOPMENT && config.development.logRequests) console.log(req.path)
    next()
})

const preRoute = config.routes.preRoute

app.use(preRoute, require('./routes/exercises.routes'))
app.use(preRoute, require('./routes/groups.routes'))
app.use(preRoute, require('./routes/session.routes'))
app.use(preRoute, require('./routes/users.routes'))
app.use(preRoute, require('./routes/weight.routes'))

require('./routes/error.routes')()