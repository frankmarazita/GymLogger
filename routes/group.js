const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, urlencodedParser, db) {

    app.get('/group/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            let exerciseGroup = await db.get("exercisegroups", req.params._id, true);
            if (exerciseGroup) {
                if (exerciseGroup.user == req.session.email) {
                    let exercises = await db.getAll("exercises", { exercisegroup: String(exerciseGroup._id) });
                    res.render('index', { layout: 'group', title: exerciseGroup.name, exerciseGroup: exerciseGroup, exercises: exercises });
                } else {
                    error.render(req, res, 403);
                }
            } else {
                error.render(req, res, 404);
            }
        }
    });

}