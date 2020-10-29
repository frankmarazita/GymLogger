const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db') // Import Database
const bcrypt = require('./bcrypt') // Import bcrypt

// Initialise MongoDB

let databaseName = "gymlog";
db.init(process.env.MONGODB_SECRET, databaseName);

// Initialise Express

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const port = 3000;

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'default',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'));

// Requests

app.get('/', (req, res) => {
    res.render('index', { layout: 'main', title: 'Main' });
});

app.get('/signup', (req, res) => {
    res.render('index', { layout: 'signup', title: 'Signup' });
});

app.post('/signup', async (req, res) => {
    // TODO Check user not exist, passwords match
    const password_hash = await bcrypt.hash(req.body.password);
    db.set("users", { _id: req.body.email, password_hash: password_hash });

    res.render('index', { layout: 'signup', title: 'Signup' });
});

app.get('/login', (req, res) => {
    res.render('index', { layout: 'login', title: 'Login' });
});

app.post('/login', urlencodedParser, async (req, res) => {
    let result = await db.get("users", { _id: req.body.email });
    if (result) {
        const valid = await bcrypt.check(req.body.password, result['password_hash']);
        console.log(valid);
    }

    res.render('index', { layout: 'login', title: 'Login' });
});

app.listen(port, () => console.log(`App listening to port ${port}`));