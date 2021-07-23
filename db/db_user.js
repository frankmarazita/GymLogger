const { ObjectID } = require('bson')
const DT = require('../constants/database_tables')

const db = require('./db')
const args = require('../utils/args')
const date = require('../utils/date')
const id = require('../utils/id')

module.exports = {

    getPasswordHash: async function (userID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.PasswordHash]: 1
            })
        }
    },

    getSessionDataWithID: async function (userID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.ID]: 1,
                [DT.User.C.DateCreated]: 1,
                [DT.User.C.Email]: 1,
                [DT.User.C.Name]: 1,
            })
        }
    },

    getSessionDataWithEmail: async function (email) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.Email]: email
            }, {
                [DT.User.C.ID]: 1,
                [DT.User.C.DateCreated]: 1,
                [DT.User.C.Email]: 1,
                [DT.User.C.Name]: 1,
            })
        }
    },

    addUser: async function (email, name, passwordHash) {
        if (args.verify(arguments, 3)) {
            return await db.set(DT.User.T, {
                [DT.User.C.ID]: ObjectID(id.new(24)),
                [DT.User.C.DateCreated]: date.now(),
                [DT.User.C.Email]: email,
                [DT.User.C.Name]: name,
                [DT.User.C.PasswordHash]: passwordHash
            })
        }
    },

    addExerciseGroupID: async function (userID, exerciseGroupID) {
        if (args.verify(arguments, 2)) {
            return await db.addArrayItem(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.ExerciseGroups]: exerciseGroupID
            })
        }
    },

    getExerciseGroupIDs: async function (userID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.ExerciseGroups]: 1
            })
        }
    },

    addWeightRecord: async function (userID, value) {
        if (args.verify(arguments, 2)) {
            return await db.addArrayItem(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Weight.T]: {
                    [DT.User.C.Weight.C.Date]: date.now(),
                    [DT.User.C.Weight.C.Value]: value,
                }
            })
        }
    },

    getWeight: async function (userID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Weight.T]: 1
            })
        }
    },

    updateEmail: async function (userID, email) {
        if (args.verify(arguments, 2)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Email]: email
            })
        }
    },

    updateName: async function (userID, name) {
        if (args.verify(arguments, 2)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Name]: name
            })
        }
    }

}