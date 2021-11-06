const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let user = new User()
        await user.loadWithID(req.session.user.id)
        let weight = await user.getWeight()
        return res.status(200).send({ weight: weight })
    },

    logWeight: async function (req, res) {
        let userID = req.session.user.id
        let value = parseFloat(req.body.value)

        let user = new User()
        await user.loadWithID(userID)

        if (value < 1) {
            return error.status(res, 400)
        }

        await user.addWeightRecord(value)
        return res.status(201).send()
    },

    updateWeight: async function (req, res) {
        let userID = req.session.user.id
        let index = req.params.id
        let newDate = utility.date.stringToDate(req.body.date)
        let value = parseFloat(req.body.value)

        let user = new User()
        await user.loadWithID(userID)

        if (value < 1) {
            return error.status(res, 400)
        }

        // TODO Ensure that body values can be updated separately
        await user.updateWeightRecord(index, newDate, value)
        return res.status(204).send()
    }

}
