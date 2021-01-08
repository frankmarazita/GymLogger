const auth = require('../controllers/auth');
const error = require('../controllers/error');

module.exports = function (app, urlencodedParser, db) {

    app.get('/group/:_id', async (req, res) => {
        if (auth.verify(req, res)) {
            let exerciseGroup = await db.get("exercisegroups", req.params._id, true);
            if (exerciseGroup) {
                if (exerciseGroup.user == req.session.user['_id']) {
                    let exercises = await db.getAll("exercises", { exercisegroup: String(exerciseGroup._id) });
                    let today = new Date().setHours(0, 0, 0, 0);
                    for (let i = 0; i < exercises.length; i++) {
                        let dailymax = exercises[i].dailymax;
                        if (dailymax) {
                            if (dailymax[dailymax.length - 1].date.setHours(0, 0, 0, 0) === today) {
                                exercises[i].done = true;
                            }
                            exercises[i].lastmax = 0;
                            for (let j = 0; j < dailymax.length; j++) {
                                if (dailymax[j].value > exercises[i].lastmax) {
                                    exercises[i].lastmax = dailymax[j].value;
                                }
                            }
                        }
                    }
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