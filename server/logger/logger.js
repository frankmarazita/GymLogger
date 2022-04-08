let axios = require('axios')
let fs = require('fs')

const utility = require('../utils/utility')

const CT = require('../constants/codeTables')

const config = require('../config/config')

const Log = require('../models/Log')

const EXTERNAL_LOGGING = process.env.EXTERNAL_LOGGING === CT.Boolean.True
const EXTERNAL_LOGGING_URL = process.env.EXTERNAL_LOGGING_URL

const folderName = config.logger.files.folderName
const relativePath = config.logger.files.relativePath
const staticPath = config.logger.files.staticPath
const directoryPath = `${__dirname}/../${folderName}`

if (relativePath !== '') {
    directoryPath = __dirname + '/' + relativePath + folderName
} else if (staticPath !== '') {
    directoryPath = staticPath + folderName
}

// Create the logger files directory if it doesn't exist
try {
    fs.statSync(directoryPath).isDirectory()
} catch (err) {
    fs.mkdirSync(directoryPath)
}

async function logToFile(fileName, id, dateTime, message) {
    const dateString = dateTime.toISOString()
    const filePath = `${directoryPath}/${fileName}`
    fs.appendFile(filePath, `[${dateString}] ${id}: ${message}\n`, (err) => {
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

async function logToDB(logType, message) {
    let log = new Log()
    await log.new(logType, message)
    return log
}

async function logCommon(logType, message) {
    let log = null
    if (config.logger.db[logType].enabled) {
        try {
            log = await logToDB(logType, message)
        } catch (err) {
            console.error(err)
        }
    }
    if (config.logger.files[logType].enabled) {
        const id = log ? log.id : utility.id.new(24)
        const dateTime = log ? log.dateCreated : utility.date.now()
        try {
            await logToFile(config.logger.files[logType].fileName, id, dateTime, message)
        } catch (err) {
            console.error(err)
        }
    }
    if (config.logger.external[logType].enabled) {
        const title = `${config.system.name}: ${utility.string.capitalize(logType)}`
        try {
            await logToExternalRoute(title, message)
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = {

    info: async function (message) {
        console.log(message)
        await logCommon(CT.LogType.Info, message)
    },

    error: async function (message) {
        console.error(message)
        await logCommon(CT.LogType.Error, message)
    },

    warn: async function (message) {
        console.warn(message)
        await logCommon(CT.LogType.Warn, message)
    }

}
