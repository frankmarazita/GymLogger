const CT = require('../constants/code_tables')

const error = require('../middleware/error')

const Exercise = require('../models/Exercise')
const ExerciseGroup = require('../models/ExerciseGroup')
const User = require('../models/User')

module.exports = {

    getAddGroup: async function (req, res) {
        return res.render('index', { layout: 'add', title: 'Add Exercise Group', type: 'group' })
    },

    getAddExercise: async function (req, res) {
        let userID = req.session.user.id
        let user = new User()
        await user.loadWithID(userID)
        let exerciseGroups = await user.getExerciseGroups()
        let types = CT.ExerciseType.C

        return res.render('index', { layout: 'add', title: 'Add Exercise', type: 'exercise', exerciseGroups: exerciseGroups, exerciseTypes: types })
    },

    addGroup: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let name = req.body.name
        let note = req.body.note

        let user = new User()
        await user.loadWithID(userID)
        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.new(user, name, note)

        return res.redirect('/group/' + exerciseGroup.id)
    },

    addExercise: async function (req, res) {
        // TODO Check integrity of request
        let userID = req.session.user.id
        let name = req.body.name
        let note = req.body.note
        let exerciseGroupID = req.body.exerciseGroup
        let exerciseType = req.body.exerciseType

        let user = new User()
        await user.loadWithID(userID)
        // Check the user has add permissions
        if (!await user.hasExerciseGroup(exerciseGroupID)) {
            return error.render(req, res, 400)
        }

        let exerciseGroup = new ExerciseGroup()
        await exerciseGroup.loadWithID(exerciseGroupID)
        let exercise = new Exercise()
        await exercise.new(exerciseGroup, user, name, note, exerciseType)

        return res.redirect('/exercise/' + exercise.id)
    }

}