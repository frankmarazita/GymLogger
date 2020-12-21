const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, urlencodedParser, db) {

    app.get('/weight', async (req, res) => {
        if (auth.verify(req, res)) {
            let user = await db.get("users", req.session._id, true);
            let weight = null;
            if (user.weight) {
                for (let i = 0; i < user.weight.length; i++) {
                    user.weight[i].date = user.weight[i].date.toLocaleDateString();
                }
                weight = user.weight;
            }
            res.render('index', { layout: 'weight', title: "Weight", weight: weight });
        }
    });

    app.post('/weight', urlencodedParser, async (req, res) => {
        if (auth.verify(req, res)) {
            let weight = { date: new Date(), value: parseFloat(req.body.value) };
            await db.updateArray("users", req.session._id, "weight", weight, true);
            res.redirect('/weight');
        }
    });

}