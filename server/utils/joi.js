const EM = require('../constants/errorMessages')

const config = require('../config/config')

const error = require('../middleware/error')

async function validateCommon(req, res, schemas) {
    let errorCode = null
    try {
        errorCode = 404
        schemas.params ? await schemas.params.validateAsync(req.params, config.joi) : null
        errorField = 400
        schemas.body ? await schemas.body.validateAsync(req.body, config.joi) : null
        errorField = 400
        schemas.headers ? await schemas.headers.validateAsync(req.headers, config.joi) : null
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
        return error.status(res, errorCode, message)
    }
    return true
}

module.exports = {

    validate: async function (req, res, next, schemas) {
        let result = await validateCommon(req, res, schemas)
        if (result === true) {
            return next()
        }
        return result
    },

    validateTrue: async function (req, res, schemas) {
        return await validateCommon(req, res, schemas)
    }

}