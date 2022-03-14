const Joi = require('joi')

const CT = require('../constants/codeTables')

const utility = require('../utils/utility')

module.exports = {

    get: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            tokenID: Joi.string().length(24).required()
        })

        return utility.joi.validate(req, res, next, { params: schemaParams })
    },

    add: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            password: Joi.string().required(),
            expiry: Joi.date().required(),
            note: Joi.string(),
            scope: Joi.object().keys({
                allowedHttpMethods: Joi.array().items(Joi.string()
                    .valid(CT.HTTP.Get, CT.HTTP.Post, CT.HTTP.Put, CT.HTTP.Delete))
                    .unique().min(1).max(4),
                allowedRoutes: Joi.array().items(Joi.string())
                    .unique().min(1),
                disallowedRoutes: Joi.array().items(Joi.string())
                    .unique().min(1)
            }).required()
        })

        return utility.joi.validate(req, res, next, { body: schemaBody })
    },

    update: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            password: Joi.string().required(),
            expiry: Joi.date(),
            enabled: Joi.boolean(),
            note: Joi.string(),
        })

        const schemaParams = Joi.object().keys({
            tokenID: Joi.string().required()
        })

        return utility.joi.validate(req, res, next, { body: schemaBody, params: schemaParams })
    },

    delete: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            password: Joi.string().required()
        })

        const schemaParams = Joi.object().keys({
            tokenID: Joi.string().length(24).required()
        })

        return utility.joi.validate(req, res, next, { body: schemaBody, params: schemaParams })
    }

}