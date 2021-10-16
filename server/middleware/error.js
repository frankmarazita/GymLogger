const EM = require('../constants/errorMessages')

exports.status = function (req, res, code, message = null) {
    if (!message) {
        message = EM.Status(code)
    }
    return res.status(code).json({ message: message })
}