const app = require('./app')

const CT = require('./constants/codeTables')

const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.C.Development

if (IS_DEVELOPMENT) {
    app.use(function (req, res, next) {
        console.log(req.path)
        next()
    })
}

const preRoute = '' // '/api'

app.use(preRoute, require('./routes/exercises.routes'))
app.use(preRoute, require('./routes/groups.routes'))
app.use(preRoute, require('./routes/login.routes'))
app.use(preRoute, require('./routes/signup.routes'))
app.use(preRoute, require('./routes/users.routes'))
app.use(preRoute, require('./routes/weight.routes'))

require('./routes/error.routes')()