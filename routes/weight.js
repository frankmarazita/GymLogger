const auth = require('../controllers/auth')
const error = require('../controllers/error')

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

module.exports = function (app, db) {

    app.get('/weight', async (req, res) => {
        if (auth.verify(req, res)) {
            let user = await db.get(CT.DB.Users.T, req.session.user[CT.Session.User.C.ID], true)
            let weight = null
            if (user.weight) {
                for (let i = 0; i < user.weight.length; i++) {
                    let d = user.weight[i].date.getDate()
                    let m = user.weight[i].date.getMonth() + 1
                    let y = user.weight[i].date.getFullYear()
                    user.weight[i].date = d + '/' + m + '/' + y
                }
                weight = user.weight
            }
            res.render('index', { layout: 'weight', title: "Weight", weight: weight })
        }
    })

    app.post('/weight', async (req, res) => {
        if (auth.verify(req, res)) {
            if (parseFloat(req.body.value) >= 1) {
                let weight = { date: new Date(), value: parseFloat(req.body.value) }
                await db.updateArray(CT.DB.Users.T, req.session.user[CT.Session.User.C.ID], CT.DB.Users.C.Weight.T, weight, true)
                res.end()
            } else {
                res.status(400).send({ message: CT.Response.C[400] })
            }
        }
    })

}