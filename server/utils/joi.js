const EM = require('../constants/errorMessages')

const error = require('../middleware/error')

module.exports = {

    validate: async function (req, res, next, schema) {
        try {
            await schema.validateAsync(req.body)
        } catch (err) {
            if (err.details[0].type === 'object.unknown') {
                return error.status(res, 400, err.details[0].message)
            }
            return error.status(res, 400, EM.Schema.InvalidSchema(err.details[0].context.key))
        }
        return next()
    }

}