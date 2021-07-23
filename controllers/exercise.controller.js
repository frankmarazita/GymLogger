const date = require('../utils/date')

const error = require('../middleware/error')

const User = require('../models/User')
const Exercise = require('../models/Exercise')

module.exports = {

    get: async function (req, res) {
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

        // TODO calculate values for render client side
        if (exercise.dailyMax) {
            for (let i = 0; i < exercise.dailyMax.length; i++) {
                exercise.dailyMax[i].dateformat = date.toStringDMY(exercise.dailyMax[i].date)
                exercise.dailyMax[i].goal = null
                if (exercise.goal) {
                    for (let j = exercise.goal.length - 1; j >= 0; j--) {
                        if (exercise.goal[j].date.getTime() < exercise.dailyMax[i].date.getTime()) {
                            exercise.dailyMax[i].goal = exercise.goal[j].value
                            break
                        }
                    }
                }
            }
        }

        // TODO calculate values for render client side
        exercise.currentgoal = null
        if (exercise.goal) {
            if (exercise.goal.length > 0) {
                exercise.currentgoal = exercise.goal[exercise.goal.length - 1].value
            }
        }

        return res.render('index', { layout: 'exercise', title: exercise.name, exercise: exercise, dailymax: exercise.dailyMax })
    },

    logDailyMax: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let exerciseID = req.params.id
        let value = parseFloat(req.body.value)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        await exercise.addDailyMaxRecord(value)
        return res.end()
    },

    logGoal: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let exerciseID = req.params.id
        let value = parseFloat(req.body.value)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        await exercise.addGoalRecord(value)
        return res.end()
    }

}