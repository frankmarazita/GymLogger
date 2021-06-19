const auth = require('../controllers/auth')
const error = require('../controllers/error')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    // TODO Fix the dailymax and goals for new db format
    app.get('/exercise/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get(CT.DB.Exercises.T, req.params._id, true)
            if (exercise) {
                let exerciseGroup = await db.get(CT.DB.ExerciseGroups.T, exercise[CT.DB.Exercises.C.ExerciseGroup], true)
                if (exerciseGroup[CT.DB.ExerciseGroups.C.User] == req.session.user[CT.Session.User.C.ID]) {

                    dailymax = null
                    if (exercise.dailymax) {
                        for (let i = 0; i < exercise.dailymax.length; i++) {
                            let d = exercise.dailymax[i].date.getDate()
                            let m = exercise.dailymax[i].date.getMonth() + 1
                            let y = exercise.dailymax[i].date.getFullYear()
                            exercise.dailymax[i].dateformat = d + '/' + m + '/' + y
                            exercise.dailymax[i].goal = null
                            if (exercise.goal) {
                                for (let j = exercise.goal.length - 1; j >= 0; j--) {
                                    if (exercise.goal[j].date.getTime() < exercise.dailymax[i].date.getTime()) {
                                        exercise.dailymax[i].goal = exercise.goal[j].value
                                        break
                                    }
                                }
                            }
                        }
                        dailymax = exercise.dailymax
                    }

                    exercise.currentgoal = null
                    if (exercise.goal) {
                        if (exercise.goal.length > 0) {
                            exercise.currentgoal = exercise.goal[exercise.goal.length - 1].value
                        }
                    }

                    res.render('index', { layout: 'exercise', title: exercise.name, exercise: exercise, dailymax: dailymax })
                } else {
                    error.render(req, res, 403)
                }
            } else {
                error.render(req, res, 404)
            }
        }
    })

    app.post('/exercise/:_id/:action', async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get(CT.DB.Exercises.T, req.params._id, true)
            if (exercise) {
                let exerciseGroup = await db.get(CT.DB.ExerciseGroups.T, exercise[CT.DB.Exercises.C.ExerciseGroup], true)
                if (exerciseGroup.user == req.session.user[CT.Session.User.C.ID]) {
                    switch (req.params.action) {
                        case CT.DB.Exercises.C.DailyMax.T: {
                            let dailymax = { date: new Date(), value: parseFloat(req.body.value) }
                            await db.updateArray(CT.DB.Exercises.T, req.params._id, CT.DB.Exercises.C.DailyMax.T, dailymax, true)
                            res.end()
                            break
                        }
                        case CT.DB.Exercises.C.Goal.T: {
                            let goal = { date: new Date(), value: parseFloat(req.body.value) }
                            await db.updateArray(CT.DB.Exercises.T, req.params._id, CT.DB.Exercises.C.Goal.T, goal, true)
                            res.end()
                            break
                        }
                        default: {
                            error.render(req, res, 422)
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