// Load Initial Configurations
const config = require('./config/config')
const app = require('./app')
const db = require('./db/db')

const LM = require('./constants/logMessages')

const utility = require('./utils/utility')

const PORT = parseInt(process.env.PORT)

const DBConfig = require('./models/DBConfig')

// Routes
require('./routes')

// Initialise MongoDB and Start Server
let server
db.init(process.env.MONGODB_SECRET, process.env.DB_NAME).then(async () => {

    // Load DBConfig
    let dbConfig = new DBConfig()
    await dbConfig.load()

    if (!dbConfig.valid) {
        await dbConfig.new(process.env.DB_NAME, config.system.version, process.env.NODE_ENV)
    }

    if (dbConfig.environment !== process.env.NODE_ENV) {
        await exitHandler(LM.DBConfigEnvironmentMismatch(dbConfig.environment, process.env.NODE_ENV))
    } else if (dbConfig.version !== config.system.version) {
        await exitHandler(LM.DBConfigVersionMismatch(dbConfig.version, config.system.version))
    } else {
        server = app.listen(PORT, () => {
            console.log(LM.ServerOpened(PORT))
        })
    }
})

const exitHandler = async (message) => {
    if (message) utility.logger.log(message)
    if (server) {
        server.close()
        console.log(LM.ServerClosed())
    }
    await db.close()
    setTimeout(() => {
        process.exit(1)
    }, config.system.exitDelay)
}

const unexpectedErrorHandler = (err) => {
    utility.logger.error(`${err} | ${JSON.stringify(err)}`)
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