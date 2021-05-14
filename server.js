const app = require('./app');
const db = require('./controllers/db');
const auth = require('./controllers/auth');
const error = require('./controllers/error');
const port = parseInt(process.env.PORT);

// Routes
require('./routes/auth')(app, db);
require('./routes/home')(app, db);
require('./routes/account')(app, db);
require('./routes/add')(app, db);
require('./routes/edit')(app, db);
require('./routes/delete')(app, db);
require('./routes/group')(app, db);
require('./routes/exercise')(app, db);
require('./routes/exercise_data')(app, db);
require('./routes/weight')(app, db);

// Default Route
app.use(function (req, res) {
    if (auth.verify(req, res)) {
        error.render(req, res, 404);
    }
});

// Initialise MongoDB and Start Server
let server;
db.init(process.env.MONGODB_SECRET, process.env.DB_NAME).then(() => {
    server = app.listen(port, () => {
        console.log(`Server listening to port ${port}`)
    });
});

const exitHandler = async () => {
    server.close();
    console.info('Server Closed');
    await db.close();
    process.exit(1);
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', async () => {
    server.close();
    console.log('Server Closed');
    await db.close();
});

process.on('SIGINT', async () => {
    server.close();
    console.log('Server Closed');
    await db.close();
});