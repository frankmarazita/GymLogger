const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    get: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            groupID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {params: schemaParams})
    },

    getExercises: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            groupID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, { params: schemaParams })
    },

    add: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            name: Joi.string().required(),
            note: Joi.string(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody})
    },

    update: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            name: Joi.string().required(),
            note: Joi.string(),
        })

        const schemaParams = Joi.object().keys({
            groupID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    }

}