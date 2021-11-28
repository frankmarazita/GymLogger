let fs = require('fs')

const date = require('./date')

const config = require('../config/config')

const directoryPath = `${__dirname}/../${config.logger.folderName}`

// Create the logger files directory if it doesn't exist
try {
    fs.statSync(directoryPath).isDirectory()
} catch (err) {
    fs.mkdirSync(directoryPath)
}

function logToFile(fileName, message) {
    fs.appendFile(`${directoryPath}/${fileName}`, `[${date.now().toISOString()}]: ${message}\n`, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {

    log: function (message) {
        console.log(message)
        if (config.logger.files.log.enabled) {
            logToFile(config.logger.files.log.fileName, message)
        }
    },

    error: function (message) {
        console.error(message)
        if (config.logger.files.error.enabled) {
            logToFile(config.logger.files.error.fileName, message)
        }
    },

    warn: function (message) {
        console.warn(message)
        if (config.logger.files.warn.enabled) {
            logToFile(config.logger.files.warn.fileName, message)
        }
    }

}

