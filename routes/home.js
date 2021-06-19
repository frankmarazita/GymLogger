const auth = require('../controllers/auth')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.get('/', async (req, res) => {
        if (auth.verify(req, res)) {
            let exerciseGroups = await db.getAll(CT.DB.ExerciseGroups.T, { user: req.session.user[CT.Session.User.C.ID] })
            for (let i = 0; i < exerciseGroups.length; i++) {
                let exercises = await db.getAll(CT.DB.Exercises.T, { exercisegroup: String(exerciseGroups[i]._id) })
                exerciseGroups[i].numexercises = exercises.length
            }
            res.render('index', { layout: 'home', title: 'Home', name: req.session.user[CT.Session.User.C.Name], exerciseGroups: exerciseGroups })
        }
    })

}