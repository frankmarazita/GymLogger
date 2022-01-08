const EM = require('../constants/errorMessages')

const config = require('../config/config')

const error = require('../middleware/error')

module.exports = {

    validate: async function (req, res, next, schemas) {
        try {
            schemas.params ? await schemas.params.validateAsync(req.params, config.joi) : null
            schemas.body ? await schemas.body.validateAsync(req.body, config.joi) : null
        } catch (err) {
            let message = ''
            for (let i = 0; i < err.details.length; i++) {
                i > 0 ? message += '\n' : null
                if (err.details[i].type === 'object.unknown') {
                    message += err.details[i].message
                } else {
                    message += EM.Schema.InvalidSchema(err.details[i].context.key)
                }
            }
            return error.status(res, 400, message)
        }
        return next()
    }

}