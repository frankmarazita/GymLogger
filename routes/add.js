const auth = require('../controllers/auth')
const error = require('../controllers/error')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.get('/add/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    res.render('index', { layout: 'add', title: 'Add Exercise Group', type: req.params.item })
                    break
                }
                case 'exercise': {
                    let exerciseGroups = await db.getAll(CT.DB.ExerciseGroups.T, { user: req.session.user[CT.Session.User.C.ID] })
                    let types = CT.ExerciseType.C
                    res.render('index', { layout: 'add', title: 'Add Exercise', type: req.params.item, exerciseGroups: exerciseGroups, exerciseTypes: types })
                    break
                }
                default: {
                    error.render(req, res, 404)
                    break
                }
            }
        }
    })

    app.post('/add/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    // TODO Check integrity of request
                    let group = {}
                    group[CT.DB.ExerciseGroups.C.User] = req.session.user[CT.Session.User.C.ID]
                    group[CT.DB.ExerciseGroups.C.Name] = req.body.name
                    group[CT.DB.ExerciseGroups.C.Note] = req.body.note
                    let exercise = await db.set(CT.DB.ExerciseGroups.T, group)
                    res.redirect('/group/' + exercise.insertedId)
                    break
                }
                case 'exercise': {
                    // TODO Check integrity of request
                    // Check user owns that group
                    let exercise = {}
                    exercise[CT.DB.Exercises.C.ExerciseGroup] = req.body.exercisegroup
                    exercise[CT.DB.Exercises.C.Name] = req.body.name
                    exercise[CT.DB.Exercises.C.Note] = req.body.note
                    exercise[CT.DB.Exercises.C.ExerciseType] = parseInt(req.body.exercisetype)
                    exercise = await db.set(CT.DB.Exercises.T, exercise)
                    res.redirect('/exercise/' + exercise.insertedId)
                    break
                }
                default: {
                    error.render(req, res, 404)
                    break
                }
            }
        }
    })

}