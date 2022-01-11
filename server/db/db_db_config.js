const { ObjectID } = require('bson')
const DT = require('../constants/databaseTables')

const db = require('./db')
const utility = require('../utils/utility')

module.exports = {

    /**
     * Get DB Config
     * @returns
     */
    get: async function () {
        if (utility.args.verify(arguments, 0)) {
            return await db.getOne(DT.DBConfig.T, {})
        }
    },

    /**
     * Add DB Config
     * @param {String} name - Name
     * @param {String} version - Version
     * @returns
     */
    add: async function (name, version, environment) {
        if (utility.args.verify(arguments, 3)) {
            return await db.set(DT.DBConfig.T, {
                [DT.DBConfig.C.ID]: ObjectID(utility.id.new(24)),
                [DT.DBConfig.C.DateCreated]: utility.date.now(),
                [DT.DBConfig.C.Name]: name,
                [DT.DBConfig.C.Version]: version,
                [DT.DBConfig.C.Environment]: environment
            })
        }
    },

    /**
     * Update the Name
     * @param {String} name - Name
     * @returns
     */
    updateName: async function (name) {
        if (utility.args.verify(arguments, 1)) {
            return await db.update(DT.DBConfig.T, {}, {
                [DT.DBConfig.C.Name]: name
            })
        }
    },

    /**
     * Updates the Version
     * @param {String} version - Verion
     * @returns
     */
    updateVersion: async function (version) {
        if (utility.args.verify(arguments, 1)) {
            return await db.update(DT.DBConfig.T, {}, {
                [DT.DBConfig.C.Version]: version
            })
        }
    }

}