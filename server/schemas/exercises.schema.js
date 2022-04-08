const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    get: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {params: schemaParams})
    },

    add: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            name: Joi.string().required(),
            note: Joi.string(),
            exerciseGroupID: Joi.string().required(),
            exerciseType: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody})
    },

    update: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            name: Joi.string(),
            note: Joi.string(),
            exerciseGroupID: Joi.string(),
            exerciseType: Joi.string(),
        })

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    },

    delete: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {params: schemaParams})
    },

    logDailyMax: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            date: Joi.date(),
            value: Joi.number().positive().required(),
        })

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    },

    logGoal: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            date: Joi.date(),
            value: Joi.number().positive().required(),
        })

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    },

    updateDailyMax: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            date: Joi.date().required(),
            value: Joi.number().positive().required(),
        })

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
            dailyMaxID: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    },

    updateGoal: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            date: Joi.date().required(),
            value: Joi.number().positive().required(),
        })

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
            goalID: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {body: schemaBody, params: schemaParams})
    },

    deleteDailyMax: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
            dailyMaxID: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {params: schemaParams})
    },

    deleteGoal: function (req, res, next) {

        const schemaParams = Joi.object().keys({
            exerciseID: Joi.string().required(),
            goalID: Joi.number().integer().min(0).required(),
        })

        return utility.joi.validate(req, res, next, {params: schemaParams})
    }

}