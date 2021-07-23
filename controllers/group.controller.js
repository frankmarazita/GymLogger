const error = require('../middleware/error')

const ExerciseGroup = require('../models/ExerciseGroup')
const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let userID = req.session.user.id
        let exerciseGroupID = req.params.id
        let user = new User()
        await user.loadWithID(userID)

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)

        if (!exerciseGroup.valid) {
            return error.render(req, res, 404)
        } else if (exerciseGroup.user != userID) {
            return error.render(req, res, 403)
        }

        let exercises = await exerciseGroup.getExercises()

        // TODO Calculate done date and max client side
        for (let i = 0; i < exercises.length; i++) {
            exercises[i].done = await exercises[i].getDailyMaxDone()
            exercises[i].dailyMaxRecord = await exercises[i].getDailyMaxPersonalBest()
        }

        return res.render('index', { layout: 'group', title: exerciseGroup.name, exerciseGroup: exerciseGroup, exercises: exercises })
    }

}