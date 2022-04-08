const { ObjectID } = require('bson')
const DT = require('../constants/databaseTables')

const db = require('./db')
const utility = require('../utils/utility')

module.exports = {

    /**
     * Add token entry
     * @param {ObjectID} userID - User ID
     * @param {Date} expiry - Token Expiry
     * @param {String} note - Note
     * @param {Object} scope - Scope
     */
    add: async function (userID, expiry, note, scope) {
        if (utility.args.verify(arguments, 4)) {
            return await db.set(DT.Token.T, {
                [DT.Token.C.ID]: ObjectID(utility.id.new(24)),
                [DT.Token.C.DateCreated]: utility.date.now(),
                [DT.Token.C.Enabled]: true,
                [DT.Token.C.User]: ObjectID(userID),
                [DT.Token.C.Expiry]: expiry,
                [DT.Token.C.Note]: note,
                [DT.Token.C.Scope.T]: scope
            })
        }
    },

    /**
     * Get token data by ID
     * @param {String|ObjectID} tokenID - Token ID
     */
    getDataByID: async function (tokenID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.Token.T, {
                [DT.Token.C.ID]: ObjectID(tokenID)
            }, {
                [DT.Token.C.ID]: 1,
                [DT.Token.C.DateCreated]: 1,
                [DT.Token.C.Enabled]: 1,
                [DT.Token.C.User]: 1,
                [DT.Token.C.Expiry]: 1,
                [DT.Token.C.Note]: 1,
                [DT.Token.C.Scope.T]: 1
            })
        }
    },

    /**
     * Get token data by user ID
     * @param {String|ObjectID} userID - User ID
     */
    getDataByUserID: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getAll(DT.Token.T, {
                [DT.User.C.ID]: ObjectID(userID)
            }, {
                [DT.Token.C.ID]: 1,
                [DT.Token.C.DateCreated]: 1,
                [DT.Token.C.Enabled]: 1,
                [DT.Token.C.User]: 1,
                [DT.Token.C.Expiry]: 1,
                [DT.Token.C.Note]: 1,
                [DT.Token.C.Scope.T]: 1
            })
        }
    },

    updateEnabled(tokenID, enabled) {
        if (utility.args.verify(arguments, 2)) {
            return db.update(DT.Token.T, {
                [DT.Token.C.ID]: ObjectID(tokenID)
            }, {
                [DT.Token.C.Enabled]: enabled
            })
        }
    },

    delete: async function (tokenID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.delete(DT.Token.T, {
                [DT.Token.C.ID]: ObjectID(tokenID)
            })
        }
    }
}