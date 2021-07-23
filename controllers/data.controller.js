const date = require('../utils/date')

const error = require('../middleware/error')

const Exercise = require('../models/Exercise')

module.exports = {

    getExerciseData: async function (req, res) {
        let userID = req.session.user.id
        let exerciseID = req.params.id

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.render(req, res, 404)
        } else if (exercise.user != userID) {
            return error.render(req, res, 403)
        }

        await exercise.getDailyMax()
        await exercise.getGoal()

        if (exercise.dailyMax) {
            for (let i = 0; i < exercise.dailyMax.length; i++) {
                exercise.dailyMax[i].dateFormat = date.toStringData(exercise.dailyMax[i].date)
            }
        }
        if (exercise.goal) {
            for (let i = 0; i < exercise.goal.length; i++) {
                exercise.goal[i].dateFormat = date.toStringData(exercise.goal[i].date)
            }
        }

        res.render('index', { layout: 'exercise_data', title: exercise.name + " Data", exercise: exercise })
    },

    updateDailyMax: async function (req, res) {

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

        await exercise.getDailyMax()
        // await exercise.getGoal()

        return res.status(200).send({ url: '/data/exercise/' + exercise.id })
    },

    updateGoal: async function (req, res) {

        let goalIndex = req.body.index
        // This is not converting to the correct date times
        let goalDate = date.stringToDate(req.body.date)
        let goalValue = req.body.value

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

        await exercise.getGoal()

        return res.status(200).send({ url: '/data/exercise/' + exercise.id })
    }

}