let axios = require('axios')
let fs = require('fs')

const date = require('./date')
const id = require('./id')

const CT = require('../constants/codeTables')

const config = require('../config/config')

const EXTERNAL_LOGGING = process.env.EXTERNAL_LOGGING === CT.Boolean.True
const EXTERNAL_LOGGING_URL = process.env.EXTERNAL_LOGGING_URL

let directoryPath = `${__dirname}/../${config.logger.folderName}`
if (config.logger.relativePath !== '') {
    directoryPath = __dirname + '/' + config.logger.relativePath + config.logger.folderName
} else if (config.logger.staticPath !== '') {
    directoryPath = config.logger.staticPath + config.logger.folderName
}

// Create the logger files directory if it doesn't exist
try {
    fs.statSync(directoryPath).isDirectory()
} catch (err) {
    fs.mkdirSync(directoryPath)
}

function logToFile(fileName, message) {
    fs.appendFile(`${directoryPath}/${fileName}`, `[${date.now().toISOString()}] ${id.new(24)}: ${message}\n`, (err) => {
        if (err) {
            console.error(err)
        }
    })
}

async function logToExternalRoute(title, body) {
    if (EXTERNAL_LOGGING && EXTERNAL_LOGGING_URL) {
        const data = {
            args: {
                title: title,
                body: body
            }
        }

        const request_options = {
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            }
        }

        await axios
            .post(EXTERNAL_LOGGING_URL, data, request_options)
            .catch((error) => {
                console.error(error);
            })
    }
}

module.exports = {

    log: async function (message) {
        console.log(message)
        if (config.logger.files.log.enabled) {
            logToFile(config.logger.files.log.fileName, message)
        }
        if (config.logger.external.log.enabled) {
            logToExternalRoute(config.system.name + ': Log', message)
        }
    },

    error: async function (message) {
        console.error(message)
        if (config.logger.files.error.enabled) {
            logToFile(config.logger.files.error.fileName, message)
        }
        if (config.logger.external.error.enabled) {
            logToExternalRoute(config.system.name + ': Error', message)
        }
    },

    warn: async function (message) {
        console.warn(message)
        if (config.logger.files.warn.enabled) {
            logToFile(config.logger.files.warn.fileName, message)
        }
        if (config.logger.external.warn.enabled) {
            logToExternalRoute(config.system.name + ': Warn', message)
        }
    }

}


