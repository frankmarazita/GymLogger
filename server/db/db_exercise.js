const { ObjectID } = require('bson')
const DT = require('../constants/databaseTables')

const db = require('./db')
const args = require('../utils/args')
const date = require('../utils/date')
const id = require('../utils/id')

module.exports = {

    /**
     * Get Exercise Data
     * @param {ObjectID} exerciseID - Target id
     * @returns
     */
    getDataWithID: async function (exerciseID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            })
        }
    },

    /**
     * Add Exercise
     * @param {ObjectID} userID - User ID
     * @param {ObjectID} exerciseGroupID - Exercise Group ID
     * @param {String} name - Name
     * @param {String} note - Note
     * @param {String} exerciseType - Exercise Type
     * @returns
     */
    addExercise: async function (userID, exerciseGroupID, name, note, exerciseType) {
        if (args.verify(arguments, 5)) {
            return await db.set(DT.Exercise.T, {
                [DT.Exercise.C.ID]: ObjectID(id.new(24)),
                [DT.Exercise.C.DateCreated]: date.now(),
                [DT.Exercise.C.User]: userID,
                [DT.Exercise.C.ExerciseGroup]: exerciseGroupID,
                [DT.Exercise.C.Name]: name,
                [DT.Exercise.C.Note]: note,
                [DT.Exercise.C.ExerciseType]: exerciseType,
            })
        }
    },

    /**
     * Removes an Exercise
     * @param {ObjectID} exerciseID - Exercise ID
     * @returns
     */
    removeExercise: async function (exerciseID) {
        if (args.verify(arguments, 1)) {
            return await db.delete(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            })
        }
    },

    /**
     * Adds a new Daily Max record to the array
     * @param {ObjectID} exerciseID - Exercise ID
     * @param {Number} value - Daily Max Value
     * @returns
     */
    addDailyMaxRecord: async function (exerciseID, value) {
        if (args.verify(arguments, 2)) {
            return await db.addArrayItem(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [DT.Exercise.C.DailyMax.T]: {
                    [DT.Exercise.C.DailyMax.C.Date]: date.now(),
                    [DT.Exercise.C.DailyMax.C.Value]: value,
                }
            })
        }
    },

    /**
     * Update an existing Exercise Daily Max Record
     * @param {ObjectID} exerciseID
     * @param {Number} index - Array Index to be Updated
     * @param {Date} date - Exercise Date Value
     * @param {Number} value - Exercise Daily Max Value
     * @returns
     */
    updateDailyMaxRecord: async function (exerciseID, index, date, value) {
        if (args.verify(arguments, 4)) {
            return await db.update(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [`${DT.Exercise.C.DailyMax.T}.${index}`]: {
                    [DT.Exercise.C.Goal.C.Date]: date,
                    [DT.Exercise.C.Goal.C.Value]: value
                }
            })
        }
    },

    /**
     * Gets the Daily Max Data
     * @param {ObjectID} exerciseID - Exercise ID
     * @returns
     */
    getDailyMax: async function (exerciseID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [DT.Exercise.C.DailyMax.T]: 1
            })
        }
    },

    /**
     * Adds a new Goal record to the array
     * @param {ObjectID} exerciseID - Exercise ID
     * @param {Number} value - Goal Value
     * @returns
     */
    addGoalRecord: async function (exerciseID, value) {
        if (args.verify(arguments, 2)) {
            return await db.addArrayItem(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [DT.Exercise.C.Goal.T]: {
                    [DT.Exercise.C.Goal.C.Date]: date.now(),
                    [DT.Exercise.C.Goal.C.Value]: value,
                }
            })
        }
    },

    /**
     * Update an existing Goal Max Record
     * @param {ObjectID} exerciseID
     * @param {Number} index - Array Index to be Updated
     * @param {Date} date - Exercise Date Value
     * @param {Number} value - Exercise Goal Value
     * @returns
     */
    updateGoalRecord: async function (exerciseID, index, date, value) {
        if (args.verify(arguments, 4)) {
            return await db.update(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [`${DT.Exercise.C.Goal.T}.${index}`]: {
                    [DT.Exercise.C.Goal.C.Date]: date,
                    [DT.Exercise.C.Goal.C.Value]: value
                }
            })
        }
    },

    /**
     * Gets the Goal Data
     * @param {ObjectID} exerciseID - Exercise ID
     * @returns
     */
    getGoal: async function (exerciseID) {
        if (args.verify(arguments, 1)) {
            return await db.getOne(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [DT.Exercise.C.Goal.T]: 1
            })
        }
    },

    /**
     * Updates the Exercise Name
     * @param {ObjectID} exerciseID - Exercise ID
     * @param {String} name - Name
     * @returns
     */
    updateName: async function (exerciseID, name) {
        if (args.verify(arguments, 2)) {
            return await db.update(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [DT.Exercise.C.Name]: name
            })
        }
    },

    /**
     * Updates the Exercise Note
     * @param {ObjectID} exerciseID - Exercise ID
     * @param {String} note - Note
     * @returns
     */
    updateNote: async function (exerciseID, note) {
        if (args.verify(arguments, 2)) {
            return await db.update(DT.Exercise.T, {
                [DT.Exercise.C.ID]: exerciseID
            }, {
                [DT.Exercise.C.Note]: note
            })
        }
    }

}