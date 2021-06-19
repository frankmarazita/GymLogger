const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

exports.render = function (req, res, code) {
    let message = EM.Response(code)
    res.render('index', { layout: 'error', title: 'Error', code: code, message: message })
}