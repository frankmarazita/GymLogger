const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, urlencodedParser, db) {

    app.get('/exercise/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get("exercises", req.params._id, true);
            if (exercise) {
                let exerciseGroup = await db.get("exercisegroups", exercise.exercisegroup, true);
                if (exerciseGroup.user == req.session._id) {

                    dailymax = null;
                    if (exercise.dailymax) {
                        for (let i = 0; i < exercise.dailymax.length; i++) {
                            exercise.dailymax[i].date = exercise.dailymax[i].date.toLocaleDateString();
                        }
                        dailymax = exercise.dailymax;
                    }

                    res.render('index', { layout: 'exercise', title: exercise.name, exercise: exercise, dailymax: dailymax });
                } else {
                    error.render(req, res, 403);
                }
            } else {
                error.render(req, res, 404);
            }
        }
    });

    app.post('/exercise/:_id/:action', urlencodedParser, async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get("exercises", req.params._id, true);
            if (exercise) {
                let exerciseGroup = await db.get("exercisegroups", exercise.exercisegroup, true);
                if (exerciseGroup.user == req.session._id) {
                    switch (req.params.action) {
                        case 'dailymax': {
                            let dailymax = { date: new Date(), value: parseFloat(req.body.value) };
                            await db.updateArray("exercises", req.params._id, "dailymax", dailymax, true);
                            res.redirect('/exercise/' + req.params._id);
                            break;
                        }
                        case 'goal': {
                            let goal = { goal: { date: new Date(), value: parseFloat(req.body.value) } };
                            await db.update("exercises", req.params._id, goal, true);
                            res.redirect('/exercise/' + req.params._id);
                            break;
                        }
                        default: {
                            error.render(req, res, 422);
                            break;
                        }
                    }
                } else {
                    error.render(req, res, 403);
                }
            } else {
                error.render(req, res, 404);
            }
        }
    });

}