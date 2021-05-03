const auth = require('../controllers/auth');
const error = require('../controllers/error');

const exerciseTypes = require('../enums/exercise-types');

module.exports = function (app, db) {

    app.get('/add/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    res.render('index', { layout: 'add', title: 'Add Exercise Group', type: req.params.item });
                    break;
                }
                case 'exercise': {
                    let exerciseGroups = await db.getAll("exercisegroups", { user: req.session.user['_id'] });
                    let types = [];
                    for (const [key, value] of Object.entries(exerciseTypes)) {
                        types.push({ key: key, value: value });
                    }
                    res.render('index', { layout: 'add', title: 'Add Exercise', type: req.params.item, exerciseGroups: exerciseGroups, exerciseTypes: types });
                    break;
                }
                default: {
                    error.render(req, res, 404);
                    break;
                }
            }
        }
    });

    app.post('/add/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    // TODO Check integrity of request
                    let group = {};
                    group.user = req.session.user['_id'];
                    group.name = req.body.name;
                    group.note = req.body.note;
                    let exercise = await db.set("exercisegroups", group);
                    res.redirect('/group/' + exercise.insertedId);
                    break;
                }
                case 'exercise': {
                    // TODO Check integrity of request
                    // Check user owns that group
                    let exercise = {};
                    exercise.exercisegroup = req.body.exercisegroup;
                    exercise.name = req.body.name;
                    exercise.note = req.body.note;
                    exercise.exercisetype = parseInt(req.body.exercisetype);
                    exercise = await db.set("exercises", exercise);
                    res.redirect('/exercise/' + exercise.insertedId);
                    break;
                }
                default: {
                    error.render(req, res, 404);
                    break;
                }
            }
        }
    });

}