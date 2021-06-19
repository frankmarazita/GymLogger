const auth = require('../controllers/auth')
const error = require('../controllers/error')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.get('/edit/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'account': {
                    res.render('index', { layout: 'edit', title: 'Edit Account', type: req.params, user: req.session.user })
                    break
                }
                default: {
                    error.render(req, res, 404)
                    break
                }
            }
        }
    })

    app.post('/edit/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'account': {
                    let error = null
                    // TODO Validate data from post request
                    if (req.body.email != req.session.user[CT.Session.User.C.Email]) {
                        let result = await db.get(CT.DB.Users.T, { email: req.body.email })
                        if (result != null) {
                            error = EM.Auth.EmailExists
                        }
                    }
                    if (error == null) {
                        req.session.user[CT.Session.User.C.Name] = req.body.name
                        req.session.user[CT.Session.User.C.Email] = req.body.email
                        await db.update(CT.DB.Users.T, req.session.user[CT.Session.User.C.ID], { name: req.body.name, email: req.body.email }, true)
                        res.render('index', { layout: 'account', title: 'Account', user: req.session.user })
                    } else {
                        res.render('index', { layout: 'edit', title: 'Edit Account', type: req.params, user: req.session.user, error: error })
                    }
                    break
                }
                default: {
                    error.render(req, res, 422)
                    break
                }
            }
        }
    })

    app.get('/edit/:item/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    let exerciseGroup = await db.get(CT.DB.ExerciseGroups.T, req.params._id, true)
                    if (exerciseGroup) {
                        if (exerciseGroup[CT.DB.ExerciseGroups.C.User] == req.session.user[CT.Session.User.C.ID]) {
                            res.render('index', { layout: 'edit', title: 'Edit Exercise Group', type: req.params, exerciseGroup: exerciseGroup })
                        } else {
                            error.render(req, res, 403)
                        }
                    } else {
                        error.render(req, res, 404)
                    }
                    break
                }
                case 'exercise': {
                    let exercise = await db.get(CT.DB.Exercises.T, req.params._id, true)
                    if (exercise) {
                        let exerciseGroup = await db.get(CT.DB.ExerciseGroups.T, exercise[CT.DB.Exercises.C.ExerciseGroup], true)
                        if (exerciseGroup[CT.DB.ExerciseGroups.C.User] == req.session.user[CT.Session.User.C.ID]) {
                            res.render('index', { layout: 'edit', title: 'Edit Exercise', type: req.params, exercise: exercise })
                        } else {
                            error.render(req, res, 403)
                        }
                    } else {
                        error.render(req, res, 404)
                    }
                    break
                }
                default: {
                    error.render(req, res, 404)
                    break
                }
            }
        }
    })

    app.post('/edit/:item/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    // TODO Check integrity of request
                    // Check user owns that group
                    let group = {}
                    group[CT.DB.ExerciseGroups.C.Name] = req.body.name
                    group[CT.DB.ExerciseGroups.C.Note] = req.body.note
                    await db.update(CT.DB.ExerciseGroups.T, req.params._id, group, true)
                    res.redirect('/group/' + req.params._id)
                    break
                }
                case 'exercise': {
                    // TODO Check integrity of request
                    // Check user owns that exercise
                    let exercise = {}
                    exercise[CT.DB.Exercises.C.Name] = req.body.name
                    exercise[CT.DB.Exercises.C.Note] = req.body.note
                    await db.update(CT.DB.Exercises.T, req.params._id, exercise, true)
                    res.redirect('/exercise/' + req.params._id)
                    break
                }
                default: {
                    error.render(req, res, 422)
                    break
                }
            }
        }
    })

}