const config = require('./config/config')
const app = require('./app')
const db = require('./db/db')

const LM = require('./constants/logMessages')

const PORT = parseInt(process.env.PORT)

// Routes
require('./routes')

// Initialise MongoDB and Start Server
let server
db.init(process.env.MONGODB_SECRET, process.env.DB_NAME).then(() => {
    server = app.listen(PORT, () => {
        console.log(LM.ServerOpened(PORT))
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