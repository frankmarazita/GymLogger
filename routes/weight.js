const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, urlencodedParser, db) {

    app.get('/weight', async (req, res) => {
        if (auth.verify(req, res)) {
            let user = await db.get("users", req.session.user['_id'], true);
            let weight = null;
            if (user.weight) {
                for (let i = 0; i < user.weight.length; i++) {
                    let d = user.weight[i].date.getDate();
                    let m = user.weight[i].date.getMonth() + 1;
                    let y = user.weight[i].date.getFullYear();
                    user.weight[i].date = d + '/' + m + '/' + y;
                }
                weight = user.weight;
            }
            res.render('index', { layout: 'weight', title: "Weight", weight: weight });
        }
    });

    app.post('/weight', urlencodedParser, async (req, res) => {
        if (auth.verify(req, res)) {
            if (parseFloat(req.body.value) >= 1) {
                let weight = { date: new Date(), value: parseFloat(req.body.value) };
                await db.updateArray("users", req.session.user['_id'], "weight", weight, true);
                res.end();
            } else {
                res.status(400).send({ message: 'Bad request' });
            }
        }
    });

}