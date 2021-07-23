const app = require('./app')
const db = require('./db/db')
const auth = require('./middleware/auth')
const error = require('./middleware/error')
const port = parseInt(process.env.PORT)

const LM = require('./constants/log_messages')

// Routes
require('./routes')

// Default Route
app.use(function (req, res, next) {
    if (auth.verifyDefault(req, res)) {
        return error.render(req, res, 404)
    }
})

// Initialise MongoDB and Start Server
let server
db.init(process.env.MONGODB_SECRET, process.env.DB_NAME).then(() => {
    server = app.listen(port, () => {
        console.log(LM.ServerOpened(port))
    })
})

const exitHandler = async () => {
    if (server) {
        server.close()
        console.log(LM.ServerClosed())
    }
    await db.close()
    process.exit(1)
}

const unexpectedErrorHandler = (err) => {
    console.error(err)
    exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', async () => {
    exitHandler()
})

process.on('SIGINT', async () => {
    exitHandler()
})