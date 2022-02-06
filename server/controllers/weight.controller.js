const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let user = new User()
        await user.loadWithID(req.userID)
        let weight = await user.getWeight()
        return res.status(200).send({ weight: weight })
    },

    add: async function (req, res) {
        let userID = req.userID
        let value = parseFloat(req.body.value)

        let user = new User()
        await user.loadWithID(userID)

        await user.addWeightRecord(value)
        return res.status(201).send()
    },

    update: async function (req, res) {
        let userID = req.userID
        let index = parseInt(req.params.weightID)
        let newDate = utility.date.stringToDate(req.body.date)
        let value = parseFloat(req.body.value)

        let user = new User()
        await user.loadWithID(userID)

        // TODO Ensure that body values can be updated separately
        await user.updateWeightRecord(index, newDate, value)
        return res.status(204).send()
    },

    delete: async function (req, res) {
        let userID = req.userID
        let index = parseInt(req.params.weightID)

        let user = new User()
        await user.loadWithID(userID)

        await user.deleteWeightRecord(index)
        return res.status(204).send()
    }

}
