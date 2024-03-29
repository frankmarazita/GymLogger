const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    add: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            value: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody})
    },

    update: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            date: Joi.date().required(),
            value: Joi.number().positive().required(),
        })

        const schemaParams = Joi.object().keys({
            weightID: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    },

    delete: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            weightID: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {params: schemaParams})
    },

}