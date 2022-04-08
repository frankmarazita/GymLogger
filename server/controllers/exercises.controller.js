const CT = require('../constants/codeTables')
const EM = require('../constants/errorMessages')

const error = require('../middleware/error')
const utility = require('../utils/utility')

const Exercise = require('../models/Exercise')
const ExerciseGroup = require('../models/ExerciseGroup')
const User = require('../models/User')

function validate(res, exercise, userID) {
    if (!exercise.valid) {
        return error.status(res, 404)
    } else if (exercise.user != userID) {
        return error.status(res, 403)
    }
}

function validateExerciseType(res, exerciseType) {
    const exerciseTypes = Object.values(CT.$(CT.ExerciseType))
    if (!exerciseTypes.includes(exerciseType)) {
        return error.status(res, 400, EM.Exercise.InvalidExerciseType(exerciseType))
    }
}

module.exports = {

    get: async function (req, res) {
        let userID = req.userID
        let exerciseID = req.params.exerciseID

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        return res.status(200).send({ exercise: exercise })
    },

    add: async function (req, res) {
        let userID = req.userID
        let name = req.body.name
        let note = req.body.note
        let exerciseGroupID = req.body.exerciseGroupID
        let exerciseType = req.body.exerciseType

        let user = new User()
        await user.loadWithID(userID)
        // Check the user has add permissions
        if (!await user.hasExerciseGroup(exerciseGroupID)) {
            return error.render(req, res, 400)
        }

        if(validateExerciseType(res, exerciseType)) return

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)
        let exercise = new Exercise()
        await exercise.new(exerciseGroup, user, name, note, exerciseType)

        return res.status(201).send({ exercise: exercise })
    },

    update: async function (req, res) {
        let userID = req.userID
        let name = req.body.name
        let note = req.body.note
        // let exerciseGroupID = req.body.exerciseGroup
        // let exerciseType = req.body.exerciseType
        let exerciseID = req.params.exerciseID

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        if (name && exercise.name != name) {
            await exercise.updateName(name)
        }
        if (note && exercise.note != note) {
            await exercise.updateNote(note)
        }

        return res.status(204).send()
    },

    delete: async function (req, res) {
        let userID = req.userID
        let exerciseID = req.params.exerciseID

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exercise.exerciseGroup)

        await exercise.delete()
        await exerciseGroup.removeExercise(exercise.id)
        return res.status(204).send()
    },

    logDailyMax: async function (req, res) {
        const userID = req.userID
        const exerciseID = req.params.exerciseID
        const date = req.body.date ? utility.date.stringToDate(req.body.date) : utility.date.now()
        const value = parseFloat(req.body.value)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        await exercise.addDailyMaxRecord(date, value)
        return res.status(201).send()
    },

    logGoal: async function (req, res) {
        const userID = req.userID
        const exerciseID = req.params.exerciseID
        const date = req.body.date ? utility.date.stringToDate(req.body.date) : utility.date.now()
        const value = parseFloat(req.body.value)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        await exercise.addGoalRecord(date, value)
        return res.status(201).send()
    },

    updateDailyMax: async function (req, res) {
        let userID = req.userID
        let exerciseID = req.params.exerciseID
        let index = req.params.dailyMaxID
        let newDate = utility.date.stringToDate(req.body.date)
        let value = parseFloat(req.body.value)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        // TODO Ensure that body values can be updated separately
        await exercise.updateDailyMaxRecord(index, newDate, value)
        return res.status(204).send()
    },

    updateGoal: async function (req, res) {
        let userID = req.userID
        let exerciseID = req.params.exerciseID
        let index = req.params.goalID
        let newDate = utility.date.stringToDate(req.body.date)
        let value = parseFloat(req.body.value)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        // TODO Ensure that body values can be updated separately
        await exercise.updateGoalRecord(index, newDate, value)
        return res.status(204).send()
    },

    deleteDailyMax: async function (req, res) {
        let userID = req.userID
        let exerciseID = req.params.exerciseID
        let index = parseInt(req.params.dailyMaxID)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        await exercise.deleteDailyMaxRecord(index)
        return res.status(204).send()
    },

    deleteGoal: async function (req, res) {
        let userID = req.userID
        let exerciseID = req.params.exerciseID
        let index = parseInt(req.params.goalID)

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (validate(res, exercise, userID)) return

        await exercise.deleteGoalRecord(index)
        return res.status(204).send()
    }

}