const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, urlencodedParser, db) {

    app.post('/delete/:item/:_id', urlencodedParser, async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    // TODO Check user owns that group
                    // TODO Iterate through and delete containing exercises
                    break;
                }
                case 'exercise': {
                    // TODO Check user owns that exercise
                    let result = await db.get("exercises", req.params._id, true);
                    await db.delete("exercises", req.params._id, true);
                    res.status(200).send({ url: '/group/' + result.exercisegroup })
                    break;
                }
                default: {
                    error.render(req, res, 422);
                    break;
                }
            }
        }
    });

}