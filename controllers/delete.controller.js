const error = require('../middleware/error')

const Exercise = require('../models/Exercise')
const ExerciseGroup = require('../models/ExerciseGroup')

module.exports = {

    deleteGroup: async function (req, res) {
        // TODO Check user owns that group
        // TODO Iterate through and delete containing exercises
    },

    deleteExercise: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let exerciseID = req.params.id

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exercise.exerciseGroup)

        await exercise.delete()
        await exerciseGroup.removeExercise(exercise.id)
        return res.status(200).send({ url: '/group/' + exerciseGroup.id })
    }

}