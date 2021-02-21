const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, urlencodedParser, db) {

    app.get('/exercise/:_id/data', async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get("exercises", req.params._id, true);
            if (exercise) {
                let exerciseGroup = await db.get("exercisegroups", exercise.exercisegroup, true);
                if (exerciseGroup.user == req.session.user['_id']) {
                    if (exercise.dailymax) {
                        for (let i = 0; i < exercise.dailymax.length; i++) {
                            exercise.dailymax[i].dateformat = exercise.dailymax[i].date.toISOString().substring(0, 16);
                        }
                    }
                    if (exercise.goal) {
                        for (let i = 0; i < exercise.goal.length; i++) {
                            exercise.goal[i].dateformat = exercise.goal[i].date.toISOString().substring(0, 16);
                        }
                    }
                    res.render('index', { layout: 'exercise_data', title: exercise.name + " Data", exercise: exercise });
                } else {
                    error.render(req, res, 403);
                }
            } else {
                error.render(req, res, 404);
            }
        }
    });

    app.post('/exercise/:_id/data/:action', urlencodedParser, async (req, res) => {
        if (auth.verify(req, res)) {
            let exercise = await db.get("exercises", req.params._id, true);
            if (exercise) {
                let exerciseGroup = await db.get("exercisegroups", exercise.exercisegroup, true);
                if (exerciseGroup.user == req.session.user['_id']) {
                    // TODO Check integrity of request
                    switch (req.params.action) {
                        case 'dailymax': {
                            // TODO Update entry in database
                            res.end();
                            break;
                        }
                        case 'goal': {
                            // TODO Update entry in database
                            res.end();
                            break;
                        }
                        default: {
                            res.status(400).send({ message: 'Bad request' });
                            break;
                        }
                    };
                } else {
                    error.render(req, res, 403);
                }
            } else {
                error.render(req, res, 404);
            }
        }
    });

}