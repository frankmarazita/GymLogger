const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    add: function (req, res, next) {

        const schema = Joi.object().keys({
            name: Joi.string().required(),
            note: Joi.string(),
            exerciseGroupID: Joi.string().required(),
            exerciseTypeID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

    update: function (req, res, next) {

        const schema = Joi.object().keys({
            name: Joi.string(),
            note: Joi.string(),
            exerciseGroupID: Joi.string(),
            exerciseTypeID: Joi.string(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

    logDailyMax: function (req, res, next) {

        const schema = Joi.object().keys({
            dailyMax: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

    logGoal: function (req, res, next) {

        const schema = Joi.object().keys({
            goal: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

    updateDailyMax: function (req, res, next) {

        const schema = Joi.object().keys({
            date: Joi.date().required(),
            value: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

    updateGoal: function (req, res, next) {

        const schema = Joi.object().keys({
            date: Joi.date().required(),
            value: Joi.number().positive().required(),
        })

        return utility.joi.validate(req, res, next, schema)
    },

}