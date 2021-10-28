const error = require('../middleware/error')

const ExerciseGroup = require('../models/ExerciseGroup')
const User = require('../models/User')

module.exports = {

    getGroup: async function (req, res) {
        let userID = req.session.user.id
        let exerciseGroupID = req.params.id
        let user = new User()
        await user.loadWithID(userID)

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)

        if (!exerciseGroup.valid) {
            return error.status(req, res, 404)
        } else if (exerciseGroup.user != userID) {
            return error.status(req, res, 403)
        }

        let exercises = await exerciseGroup.getExercises()

        // TODO Calculate done date and max client side
        for (let i = 0; i < exercises.length; i++) {
            exercises[i].done = await exercises[i].getDailyMaxDone()
            exercises[i].dailyMaxRecord = await exercises[i].getDailyMaxPersonalBest()
        }

        // TODO Change this method such that there is a method where exercises are not also returned, just group data
        return res.status(200).send({ exerciseGroup: exerciseGroup, exercises: exercises })
    },

    add: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let name = req.body.name
        let note = req.body.note

        let user = new User()
        await user.loadWithID(userID)
        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.new(user, name, note)

        return res.status(201).send({ exerciseGroup: exerciseGroup })
    },

    update: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let name = req.body.name
        let note = req.body.note
        let exerciseGroupID = req.params.id

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)

        if (!exerciseGroup.valid) {
            return error.status(req, res, 400)
        } else if (exerciseGroup.user != userID) {
            return error.status(req, res, 403)
        }

        if (exerciseGroup.name != name) {
            await exerciseGroup.updateName(name)
        }
        if (exerciseGroup.note != note) {
            await exerciseGroup.updateNote(note)
        }

        return res.status(204).send()
    },

    getGroups: async function (req, res) {
        let userID = req.session.user.id
        let user = new User()
        await user.loadWithID(userID)
        let exerciseGroups = await user.getExerciseGroups()
        return res.status(200).send({ exerciseGroups: exerciseGroups })
    }

}