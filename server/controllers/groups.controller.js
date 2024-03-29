const error = require('../middleware/error')

const ExerciseGroup = require('../models/ExerciseGroup')
const User = require('../models/User')

function validate(res, exerciseGroup, userID) {
    if (!exerciseGroup.valid) {
        return error.status(res, 404)
    } else if (exerciseGroup.user != userID) {
        return error.status(res, 403)
    }
}

module.exports = {

    get: async function (req, res) {
        let userID = req.userID
        let exerciseGroupID = req.params.groupID
        let user = new User()
        await user.loadWithID(userID)

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)

        if (validate(res, exerciseGroup, userID)) return

        return res.status(200).send({ exerciseGroup: exerciseGroup })
    },

    getExercises: async function (req, res) {
        let userID = req.userID
        let exerciseGroupID = req.params.groupID
        let user = new User()
        await user.loadWithID(userID)

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)

        if (validate(res, exerciseGroup, userID)) return

        let exercises = await exerciseGroup.getExercises()

        return res.status(200).send({ exercises: exercises })
    },

    add: async function (req, res) {
        let userID = req.userID
        let name = req.body.name
        let note = req.body.note

        let user = new User()
        await user.loadWithID(userID)
        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.new(user, name, note)

        return res.status(201).send({ exerciseGroup: exerciseGroup })
    },

    update: async function (req, res) {
        let userID = req.userID
        let name = req.body.name
        let note = req.body.note
        let exerciseGroupID = req.params.groupID

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)

        if (validate(res, exerciseGroup, userID)) return

        if (name && exerciseGroup.name != name) {
            await exerciseGroup.updateName(name)
        }
        if (note && exerciseGroup.note != note) {
            await exerciseGroup.updateNote(note)
        }

        return res.status(204).send()
    },

    getGroups: async function (req, res) {
        let userID = req.userID
        let user = new User()
        await user.loadWithID(userID)
        let exerciseGroups = await user.getExerciseGroups()
        return res.status(200).send({ exerciseGroups: exerciseGroups })
    }

}