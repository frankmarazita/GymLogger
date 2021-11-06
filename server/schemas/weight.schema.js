const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    logWeight: function (req, res, next) {

        const schema = Joi.object().keys({
            value: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

    updateWeight: function (req, res, next) {

        const schema = Joi.object().keys({
            date: Joi.date().required(),
            value: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, schema)
    }

}