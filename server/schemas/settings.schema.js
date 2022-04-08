const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    update: function (req, res, next) {

        const schemaBody = Joi.object().keys({
            buttonNavigation: Joi.boolean(),
            darkMode: Joi.boolean(),
        })

        return utility.joi.validate(req, res, next, { body: schemaBody })
    }

}