const error = require('../middleware/error')
const date = require('../utils/date')

const Exercise = require('../models/Exercise')
const ExerciseGroup = require('../models/ExerciseGroup')
const User = require('../models/User')

module.exports = {

    get: async function (req, res) {
        let userID = req.session.user.id
        let exerciseID = req.params.id

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 404)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        await exercise.getDailyMax()
        await exercise.getGoal()

        return res.status(200).send({ exercise: exercise })
    },

    add: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let name = req.body.name
        let note = req.body.note
        let exerciseGroupID = req.body.exerciseGroupID
        let exerciseTypeID = req.body.exerciseTypeID

        let user = new User()
        await user.loadWithID(userID)
        // Check the user has add permissions
        if (!await user.hasExerciseGroup(exerciseGroupID)) {
            return error.render(req, res, 400)
        }

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)
        let exercise = new Exercise()
        await exercise.new(exerciseGroup, user, name, note, exerciseTypeID)

        return res.status(201).send({ exercise: exercise })
    },

    update: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let name = req.body.name
        let note = req.body.note
        // let exerciseGroupID = req.body.exerciseGroup
        // let exerciseType = req.body.exerciseType
        let exerciseID = req.params.id

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        if (exercise.name != name) {
            await exercise.updateName(name)
        }
        if (exercise.note != note) {
            await exercise.updateNote(note)
        }

        return res.status(204).send()
    },

    delete: async function (req, res) {
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
        return res.status(204).send()
    },

    logDailyMax: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let exerciseID = req.params.id
        let dailyMax = parseFloat(req.body.dailyMax)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        await exercise.addDailyMaxRecord(dailyMax)
        return res.status(201).send()
    },

    logGoal: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let exerciseID = req.params.id
        let goal = parseFloat(req.body.goal)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        await exercise.addGoalRecord(goal)
        return res.status(201).send()
    },

    updateDailyMax: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let exerciseID = req.params.id
        let index = req.body.index
        let newDate = date.stringToDate(req.body.date)
        let value = parseFloat(req.body.value)
        let timezoneOffset = req.body.timezoneOffset

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        await exercise.updateDailyMaxRecord(index, newDate, value)
        return res.status(204).send()
    },

    updateGoal: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let exerciseID = req.params.id
        let index = req.body.index
        let newDate = date.stringToDate(req.body.date)
        let value = parseFloat(req.body.value)
        let timezoneOffset = req.body.timezoneOffset

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.status(req, res, 400)
        } else if (exercise.user != userID) {
            return error.status(req, res, 403)
        }

        await exercise.updateGoalRecord(index, newDate, value)
        return res.status(204).send()
    }

}