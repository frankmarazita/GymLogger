const EM = require('../constants/error_messages')

const error = require('../middleware/error')

const Exercise = require('../models/Exercise')
const ExerciseGroup = require('../models/ExerciseGroup')
const User = require('../models/User')

module.exports = {

    getEditAccount: async function (req, res) {
        let userID = req.session.user.id

        let user = new User()
        await user.loadWithID(userID)

        let type = { item: 'account' }

        return res.render('index', { layout: 'edit', title: 'Edit Account', type: type, user: user })
    },

    editAccount: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let email = req.body.email
        let name = req.body.name

        let user = new User()
        await user.loadWithID(userID)

        if (user.email != email) {
            let userEmailExists = new User()
            await userEmailExists.loadWithEmail(email)
            if (userEmailExists.valid) {
                return error.status(req, res, 403, EM.Auth.EmailExists)
            }
        }

        if (user.email != email) {
            await user.updateEmail(email)
        }
        if (user.name != name) {
            await user.updateName(name)
        }

        await user.reload()
        req.session.user = user
        return res.status(200).send({ url: '/account' })
    },

    getEditExerciseGroup: async function (req, res) {
        let userID = req.session.user.id
        let exerciseGroupID = req.params.id

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)

        if (!exerciseGroup.valid) {
            return error.render(req, res, 404)
        } else if (exerciseGroup.user != userID) {
            return error.render(req, res, 403)
        }

        let type = { id: exerciseGroupID, item: 'group' }

        return res.render('index', { layout: 'edit', title: 'Edit Exercise Group', type: type, exerciseGroup: exerciseGroup })
    },

    editExerciseGroup: async function (req, res) {
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

        return res.status(200).send({ url: '/group/' + exerciseGroup.id })
    },

    getEditExercise: async function (req, res) {
        let userID = req.session.user.id
        let exerciseID = req.params.id

        let exercise = new Exercise()
        await exercise.loadWithID(exerciseID)

        if (!exercise.valid) {
            return error.render(req, res, 404)
        } else if (exercise.user != userID) {
            return error.render(req, res, 403)
        }

        let type = { id: exerciseID, item: 'exercise' }

        return res.render('index', { layout: 'edit', title: 'Edit Exercise', type: type, exercise: exercise })
    },

    editExercise: async function (req, res) {
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

        return res.status(200).send({ url: '/exercise/' + exercise.id })
    }

}