const auth = require('../controllers/auth')
const error = require('../controllers/error')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.get('/exercise/:_id/data', async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get(CT.DB.Exercises.T, req.params._id, true)
            if (exercise) {
                let exerciseGroup = await db.get(CT.DB.ExerciseGroups.T, exercise[CT.DB.Exercises.C.ExerciseGroup], true)
                if (exerciseGroup[CT.DB.ExerciseGroups.C.User] == req.session.user[CT.Session.User.C.ID]) {
                    if (exercise[CT.DB.Exercises.C.DailyMax.T]) {
                        for (let i = 0; i < exercise[CT.DB.Exercises.C.DailyMax.T].length; i++) {
                            exercise[CT.DB.Exercises.C.DailyMax.T][i].dateformat = exercise[CT.DB.Exercises.C.DailyMax.T][i].date.toISOString().substring(0, 16)
                        }
                    }
                    if (exercise[CT.DB.Exercises.C.Goal.T]) {
                        for (let i = 0; i < exercise[CT.DB.Exercises.C.Goal.T].length; i++) {
                            exercise[CT.DB.Exercises.C.Goal.T][i].dateformat = exercise[CT.DB.Exercises.C.Goal.T][i].date.toISOString().substring(0, 16)
                        }
                    }
                    res.render('index', { layout: 'exercise_data', title: exercise[CT.DB.Exercises.C.Name] + " Data", exercise: exercise })
                } else {
                    error.render(req, res, 403)
                }
            } else {
                error.render(req, res, 404)
            }
        }
    })

    app.post('/exercise/:_id/data/:action', async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get(CT.DB.Exercises.T, req.params._id, true)
            if (exercise) {
                let exerciseGroup = await db.get(CT.DB.ExerciseGroups.T, exercise[CT.DB.Exercises.C.ExerciseGroup], true)
                if (exerciseGroup[CT.DB.ExerciseGroups.C.User] == req.session.user[CT.Session.User.C.ID]) {
                    // TODO Check integrity of request
                    switch (req.params.action) {
                        case CT.DB.Exercises.C.DailyMax.T: {
                            // TODO Update entry in database
                            res.end()
                            break
                        }
                        case CT.DB.Exercises.C.Goal.T: {
                            // TODO Update entry in database
                            res.end()
                            break
                        }
                        default: {
                            res.status(400).send({ message: CT.Response.C[400] })
                            break
                        }
                    }
                } else {
                    error.render(req, res, 403)
                }
            } else {
                error.render(req, res, 404)
            }
        }
    })

}