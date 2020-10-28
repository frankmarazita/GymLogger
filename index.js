const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 3000;

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'default',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {layout: 'main', title: 'Main'});
});

app.get('/signup', (req, res) => {
    res.render('index', {layout: 'signup', title: 'Signup'});
});

app.get('/login', (req, res) => {
    res.render('index', {layout: 'login', title: 'Login'});
});

app.post('/login', urlencodedParser, (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    res.render('index', { layout: 'login', title: 'Login' });
});

app.listen(port, () => console.log(`App listening to port ${port}`));