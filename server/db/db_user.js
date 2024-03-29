const { ObjectID } = require('bson')
const DT = require('../constants/databaseTables')

const db = require('./db')
const utility = require('../utils/utility')

module.exports = {

    getPasswordHash: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.PasswordHash]: 1
            })
        }
    },

    getTwoFactorSecret: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.TwoFactorSecret]: 1
            })
        }
    },

    getDataWithID: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.ID]: 1,
                [DT.User.C.DateCreated]: 1,
                [DT.User.C.Email]: 1,
                [DT.User.C.Name]: 1,
                [DT.User.C.TwoFactorEnabled]: 1,
            })
        }
    },

    getDataWithEmail: async function (email) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.Email]: email
            }, {
                [DT.User.C.ID]: 1,
                [DT.User.C.DateCreated]: 1,
                [DT.User.C.Email]: 1,
                [DT.User.C.Name]: 1,
                [DT.User.C.TwoFactorEnabled]: 1,
            })
        }
    },

    addUser: async function (email, name, passwordHash) {
        if (utility.args.verify(arguments, 3)) {
            return await db.set(DT.User.T, {
                [DT.User.C.ID]: ObjectID(utility.id.new(24)),
                [DT.User.C.DateCreated]: utility.date.now(),
                [DT.User.C.Email]: email,
                [DT.User.C.Name]: name,
                [DT.User.C.PasswordHash]: passwordHash
            })
        }
    },

    addExerciseGroupID: async function (userID, exerciseGroupID) {
        if (utility.args.verify(arguments, 2)) {
            return await db.addArrayItem(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.ExerciseGroups]: exerciseGroupID
            })
        }
    },

    getExerciseGroupIDs: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.ExerciseGroups]: 1
            })
        }
    },

    addWeightRecord: async function (userID, value) {
        if (utility.args.verify(arguments, 2)) {
            return await db.addArrayItem(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Weight.T]: {
                    [DT.User.C.Weight.C.Date]: utility.date.now(),
                    [DT.User.C.Weight.C.Value]: value,
                }
            })
        }
    },

    updateWeightRecord: async function (userID, index, date, value) {
        if (utility.args.verify(arguments, 4)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [`${DT.User.C.Weight.T}.${index}`]: {
                    [DT.Exercise.C.Goal.C.Date]: date,
                    [DT.Exercise.C.Goal.C.Value]: value
                }
            })
        }
    },

    deleteWeightRecord: async function (userID, index) {
        if (utility.args.verify(arguments, 2)) {
            return await db.removeArrayItemByIndex(DT.User.T, {
                [DT.User.C.ID]: userID
            }, DT.User.C.Weight.T, index
            )
        }
    },

    getWeight: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Weight.T]: 1
            })
        }
    },

    getSettings: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.getOne(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Settings.T]: 1
            })
        }
    },

    updateSettings: async function (userID, settings) {
        if (utility.args.verify(arguments, 2)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Settings.T]: settings
            })
        }
    },

    updateEmail: async function (userID, email) {
        if (utility.args.verify(arguments, 2)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Email]: email
            })
        }
    },

    updateName: async function (userID, name) {
        if (utility.args.verify(arguments, 2)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.Name]: name
            })
        }
    },

    updatePassword: async function (userID, passwordHash) {
        if (utility.args.verify(arguments, 2)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.PasswordHash]: passwordHash
            })
        }
    },

    setTwoFactor: async function (userID, twoFactorSecret) {
        if (utility.args.verify(arguments, 2)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.TwoFactorEnabled]: true,
                [DT.User.C.TwoFactorSecret]: twoFactorSecret
            })
        }
    },

    unsetTwoFactor: async function (userID) {
        if (utility.args.verify(arguments, 1)) {
            return await db.update(DT.User.T, {
                [DT.User.C.ID]: userID
            }, {
                [DT.User.C.TwoFactorEnabled]: false,
                [DT.User.C.TwoFactorSecret]: null
            })
        }
    }

}