const { ObjectID } = require('bson')
const DT = require('../constants/database_tables')

const db = require('./db')
const args = require('../utils/args')
const date = require('../utils/date')
const id = require('../utils/id')

module.exports = {

    /**
     * Get Exercise Group Data
     * @param {ObjectID} exerciseGroupID - Target id
     * @returns
     */
    getDataWithID: async function (exerciseGroupID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.ExerciseGroup.T, {
                [DT.ExerciseGroup.C.ID]: exerciseGroupID
            })
        }
    },

    /**
     * Add a new Exercise Group
     * @param {String} userID - User ID
     * @param {String} name - Name
     * @param {String} note - Note
     * @returns
     */
    addExerciseGroup: async function (userID, name, note) {
        if (args.verify(arguments, 3)) {
            return await db.set(DT.ExerciseGroup.T, {
                [DT.ExerciseGroup.C.ID]: ObjectID(id.new(24)),
                [DT.ExerciseGroup.C.DateCreated]: date.now(),
                [DT.ExerciseGroup.C.User]: userID,
                [DT.ExerciseGroup.C.Name]: name,
                [DT.ExerciseGroup.C.Note]: note,
                [DT.ExerciseGroup.C.Exercises]: []
            })
        }
    },

    /**
     * Adds an Exercise ID to the Group's exercise array
     * @param {String} exerciseGroupID - Exercise Group ID
     * @param {String} exerciseID - Exercise ID
     * @returns
     */
    addExerciseID: async function (exerciseGroupID, exerciseID) {
        if (args.verify(arguments, 2)) {
            return await db.addArrayItem(DT.ExerciseGroup.T, {
                [DT.ExerciseGroup.C.ID]: exerciseGroupID
            }, {
                [DT.ExerciseGroup.C.Exercises]: exerciseID
            })
        }
    },

    /**
     * Returns the Group's Exercise IDs
     * @param {String} exerciseGroupID - Exercise Group ID
     * @returns
     */
    getExerciseIDs: async function (exerciseGroupID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.ExerciseGroup.T, {
                [DT.ExerciseGroup.C.ID]: exerciseGroupID
            }, {
                [DT.ExerciseGroup.C.Exercises]: 1
            })
        }
    },

    /**
     * Removes an Exercise ID from the Group's exercise array
     * @param {String} exerciseGroupID - Exercise Group ID
     * @param {String} exerciseID - Exercise ID
     * @returns
     */
    removeExerciseID: async function (exerciseGroupID, exerciseID) {
        if (args.verify(arguments, 2)) {
            return await db.removeArrayItem(DT.ExerciseGroup.T, {
                [DT.ExerciseGroup.C.ID]: exerciseGroupID
            }, {
                [DT.ExerciseGroup.C.Exercises]: exerciseID
            })
        }
    },

    /**
     * Updates the Exercise Group Name
     * @param {String} exerciseGroupID - Exercise Group ID
     * @param {String} name - Name
     * @returns
     */
    updateName: async function (exerciseGroupID, name) {
        if (args.verify(arguments, 2)) {
            return await db.update(DT.ExerciseGroup.T, {
                [DT.ExerciseGroup.C.ID]: exerciseGroupID
            }, {
                [DT.ExerciseGroup.C.Name]: name
            })
        }
    },

    /**
     * Updates the Exercise Group Note
     * @param {String} exerciseGroupID - Exericse Group ID
     * @param {String} note - Note
     * @returns
     */
    updateNote: async function (exerciseGroupID, note) {
        if (args.verify(arguments, 2)) {
            return await db.update(DT.ExerciseGroup.T, {
                [DT.ExerciseGroup.C.ID]: exerciseGroupID
            }, {
                [DT.ExerciseGroup.C.Note]: note
            })
        }
    }

}