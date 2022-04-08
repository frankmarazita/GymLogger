const error = require('../middleware/error')
const utility = require('../utils/utility')

const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let user = new User()
        await user.loadWithID(req.userID)
        let settings = await user.getSettings()
        settings = settings ? settings : {}
        return res.status(200).send({ settings: settings })
    },

    update: async function (req, res) {
        const userID = req.userID
        const buttonNavigation = req.body.buttonNavigation
        const darkMode = req.body.darkMode

        let user = new User()
        await user.loadWithID(userID)

        let settings = await user.getSettings()
        settings = settings ? settings : {}

        if (buttonNavigation !== null && settings.buttonNavigation !== buttonNavigation) {
            settings.buttonNavigation = buttonNavigation
        }

        if (darkMode !== null && settings.darkMode !== darkMode) {
            settings.darkMode = darkMode
        }

        await user.updateSettings(settings)
        return res.status(204).send()
    }

}
