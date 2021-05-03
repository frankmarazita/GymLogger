const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, db) {

    app.get('/edit/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'account': {
                    res.render('index', { layout: 'edit', title: 'Edit Account', type: req.params, user: req.session.user });
                    break;
                }
                default: {
                    error.render(req, res, 404);
                    break;
                }
            }
        }
    });

    app.post('/edit/:item', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'account': {
                    let error = null;
                    // TODO Validate data from post request
                    if (req.body.email != req.session.user['email']) {
                        let result = await db.get("users", { email: req.body.email });
                        if (result != null) {
                            error = "Email already in use";
                        }
                    }
                    if (error == null) {
                        req.session.user['name'] = req.body.name;
                        req.session.user['email'] = req.body.email;
                        await db.update("users", req.session.user['_id'], { name: req.body.name, email: req.body.email }, true);
                        res.render('index', { layout: 'account', title: 'Account', user: req.session.user });
                    } else {
                        res.render('index', { layout: 'edit', title: 'Edit Account', type: req.params, user: req.session.user, error: error });
                    }
                    break;
                }
                default: {
                    error.render(req, res, 422);
                    break;
                }
            }
        }
    });

    app.get('/edit/:item/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    let exerciseGroup = await db.get("exercisegroups", req.params._id, true);
                    if (exerciseGroup) {
                        if (exerciseGroup.user == req.session.user['_id']) {
                            res.render('index', { layout: 'edit', title: 'Edit Exercise Group', type: req.params, exerciseGroup: exerciseGroup });
                        } else {
                            error.render(req, res, 403);
                        }
                    } else {
                        error.render(req, res, 404);
                    }
                    break;
                }
                case 'exercise': {
                    let exercise = await db.get("exercises", req.params._id, true)
                    if (exercise) {
                        let exerciseGroup = await db.get("exercisegroups", exercise.exercisegroup, true);
                        if (exerciseGroup.user == req.session.user['_id']) {
                            res.render('index', { layout: 'edit', title: 'Edit Exercise', type: req.params, exercise: exercise });
                        } else {
                            error.render(req, res, 403);
                        }
                    } else {
                        error.render(req, res, 404);
                    }
                    break;
                }
                default: {
                    error.render(req, res, 404);
                    break;
                }
            }
        }
    });

    app.post('/edit/:item/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            switch (req.params.item) {
                case 'group': {
                    // TODO Check integrity of request
                    // Check user owns that group
                    let group = {};
                    group.name = req.body.name;
                    group.note = req.body.note;
                    await db.update("exercisegroups", req.params._id, group, true);
                    res.redirect('/group/' + req.params._id);
                    break;
                }
                case 'exercise': {
                    // TODO Check integrity of request
                    // Check user owns that exercise
                    let exercise = {};
                    exercise.name = req.body.name;
                    exercise.note = req.body.note;
                    await db.update("exercises", req.params._id, exercise, true);
                    res.redirect('/exercise/' + req.params._id);
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