const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    add: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
            name: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody})
    },

    update: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            email: Joi.string().email(),
            name: Joi.string(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody})
    },

    updatePassword: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, { body: schemaBody })
    }

}