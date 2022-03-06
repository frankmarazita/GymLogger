const { ObjectID } = require('bson')
const DT = require('../constants/databaseTables')

const db = require('./db')
const utility = require('../utils/utility')

module.exports = {

    /**
     * Add log entry
     * @param {String} _id - ID
     * @param {String} type - Log Type
     * @param {String} dateCreated - Date Time
     * @param {String} message - Log Message
     * @returns
     */
    add: async function (type, message) {
        if (utility.args.verify(arguments, 2)) {
            return await db.set(DT.Logs.T, {
                [DT.Logs.C.ID]: ObjectID(utility.id.new(24)),
                [DT.Logs.C.DateCreated]: utility.date.now(),
                [DT.Logs.C.Type]: type,
                [DT.Logs.C.Message]: message
            })
        }
    }

}