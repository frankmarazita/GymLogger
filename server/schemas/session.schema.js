const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    new: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        return utility.joi.validate(req, res, next, {body: schemaBody})
    }

}