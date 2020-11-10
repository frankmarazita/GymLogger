const auth = require('../controllers/auth');

module.exports = function (app, urlencodedParser, db) {

    app.get('/', async (req, res) => {
        if (auth.verify(req, res)) {
            let exerciseGroups = await db.getAll("exercisegroups", { user: req.session.email });
            for (let i = 0; i < exerciseGroups.length; i++) {
                let exercises = await db.getAll("exercises", { exercisegroup: String(exerciseGroups[i]._id) });
                exerciseGroups[i].numexercises = exercises.length;
            }
            res.render('index', { layout: 'home', title: 'Home', name: req.session.name, exerciseGroups: exerciseGroups });
        }
    });

}