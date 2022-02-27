// Load Initial Configurations
const config = require('./config/config')
const app = require('./app')
const db = require('./db/db')

const EM = require('./constants/errorMessages')
const LM = require('./constants/logMessages')

const utility = require('./utils/utility')

const PORT = parseInt(process.env.PORT)

const DBConfig = require('./models/DBConfig')

// Routes
require('./routes')

// Initialise DB and Start Server
let server
db.init().then(async () => {

    // Load DBConfig
    let dbConfig = new DBConfig()
    await dbConfig.load()

    if (await dbConfig.validate()) {
        // Start Server
        server = app.listen(PORT, () => {
            console.log(LM.Server.Opened(PORT))
        })
    }
})

const exitHandler = async () => {
    if (server) {
        server.close()
        console.log(LM.Server.Closed())
    }
    await db.close()
    setTimeout(() => {
        process.exit(1)
    }, config.system.exitDelay)
}

const unexpectedErrorHandler = async (err) => {
    let error = err
    if (JSON.stringify(err) !== JSON.stringify({})) {
        error += ` | ${JSON.stringify(err)}`
    }
    await utility.logger.error(error)
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