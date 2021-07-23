const date = require('../utils/date')

const error = require('../middleware/error')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let user = new User()
        await user.loadWithID(req.session.user.id)
        let weight = await user.getWeight()
        // TODO calculate date format client side
        if (weight) {
            for (let i = 0; i < weight.length; i++) {
                weight[i].date = date.toStringDMY(weight[i].date)
            }
        }
        return res.render('index', { layout: 'weight', title: "Weight", weight: weight })
    },

    logWeight: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let value = parseFloat(req.body.value)
        let user = new User()
        await user.loadWithID(userID)
        if (value < 1) {
            return error.status(req, res, 400)
        }
        await user.addWeightRecord(value)
        return res.end()
    }

}
