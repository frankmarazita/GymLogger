const Joi = require('joi')

const utility = require('../utils/utility')

module.exports = {

    verifyCommon: async function (req, res, next) {

        const schemaHeaders = Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown()

        return utility.joi.validateTrue(req, res, { headers: schemaHeaders })
    }

}