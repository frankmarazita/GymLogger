const User = require('../models/User')

module.exports = {

    get: async function (req, res) {

        let userID = req.session.user.id

        let user = new User()
        await user.loadWithID(userID)
        let exerciseGroups = await user.getExerciseGroups()

        return res.render('index', { layout: 'home', title: 'Home', name: user.name, exerciseGroups: exerciseGroups })
    }

}