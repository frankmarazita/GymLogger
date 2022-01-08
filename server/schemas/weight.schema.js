const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    logWeight: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            value: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody})
    },

    updateWeight: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            date: Joi.date().required(),
            value: Joi.number().positive().required(),
        })

        const schemaParams = Joi.object().keys({
            id: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    },

    deleteWeight: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            id: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {params: schemaParams})
    },

}