const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    add: function (req, res, next) {

        const schema = Joi.object().keys({
            name: Joi.string().required(),
            note: Joi.string(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

    update: function (req, res, next) {

        const schema = Joi.object().keys({
            name: Joi.string().required(),
            note: Joi.string(),
        })

        return utility.joi.validate(req, res, next, schema)
    }

}