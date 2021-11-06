const CT = require('../constants/codeTables')
const EM = require('../constants/errorMessages')

const config = require('../config/config')

const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.C.Development

exports.status = function (res, code, message = null) {
    if (!message) {
        message = EM.Status(code)
    }

    if (IS_DEVELOPMENT && config.development.logErrors) console.log('Error:', message)

    return res.status(code).json({ message: message })
}