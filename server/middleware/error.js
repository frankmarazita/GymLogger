const EM = require('../constants/errorMessages')

exports.render = function (req, res, code, message = null) {
    if (!message) {
        message = EM.Status(code)
    }
    return res.render('index', { layout: 'error', title: 'Error', code: code, message: message })
}

exports.status = function (req, res, code, message = null) {
    if (!message) {
        message = EM.Status(code)
    }
    return res.status(code).json({ message: message })
}