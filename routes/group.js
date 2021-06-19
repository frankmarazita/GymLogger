const auth = require('../controllers/auth')
const error = require('../controllers/error')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.get('/group/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            let exerciseGroup = await db.get(CT.DB.ExerciseGroups.T, req.params._id, true)
            if (exerciseGroup) {
                if (exerciseGroup[CT.DB.ExerciseGroups.C.User] == req.session.user[CT.Session.User.C.ID]) {
                    let exercises = await db.getAll(CT.DB.Exercises.T, { exercisegroup: String(exerciseGroup._id) })
                    let today = new Date().setHours(0, 0, 0, 0)
                    for (let i = 0; i < exercises.length; i++) {
                        let dailymax = exercises[i].dailymax
                        if (dailymax) {
                            if (dailymax[dailymax.length - 1].date.setHours(0, 0, 0, 0) === today) {
                                exercises[i].done = true
                            }
                            exercises[i].lastmax = 0
                            for (let j = 0; j < dailymax.length; j++) {
                                if (dailymax[j].value > exercises[i].lastmax) {
                                    exercises[i].lastmax = dailymax[j].value
                                }
                            }
                        }
                    }
                    res.render('index', { layout: 'group', title: exerciseGroup.name, exerciseGroup: exerciseGroup, exercises: exercises })
                } else {
                    error.render(req, res, 403)
                }
            } else {
                error.render(req, res, 404)
            }
        }
    })

}