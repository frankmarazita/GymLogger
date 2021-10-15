const config = require('../server/config/config')
const db = require('../server/db/db')

db.init(process.env.MONGODB_SECRET, process.env.DB_NAME).then(() => {
    // TODO
    // Load db and check if it has 'config' table
    // If it has a config table, check the db version and apply the appropriate
    // db_update (roll-forward) commands
    // Else add a config table and the appropriate setup variables

    // TODO
    // check db version and server version for compatibility
    db.close()
});