const auth = require('../controllers/auth')
const error = require('../controllers/error')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.post('/delete/:item/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    // TODO Check user owns that group
                    // TODO Iterate through and delete containing exercises
                    break
                }
                case 'exercise': {
                    // TODO Check user owns that exercise
                    let exercise = await db.get(CT.DB.Exercises.T, req.params._id, true)
                    await db.delete(CT.DB.Exercises.T, req.params._id, true)
                    res.status(200).send({ url: '/group/' + exercise[CT.DB.Exercises.C.ExerciseGroup] })
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