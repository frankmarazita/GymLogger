const { ObjectID } = require('bson')
const DT = require('../constants/databaseTables')

const db_exercise = require('../db/db_exercise')

module.exports = class Exercise {
    constructor() {
        this.valid = false
        this.id = null
        this.dateCreated = null
        this.user = null
        this.exerciseGroup = null
        this.name = null
        this.note = null
        this.exerciseType = null
        this.dailyMax = null
        this.goal = null
    }

    /**
     * Load data from database
     * @returns {Boolean}
     */
    async loadDBData(dbResult) {
        this.valid = dbResult != null
        if (this.valid) {
            this.id = dbResult[DT.Exercise.C.ID]
            this.dateCreated = dbResult[DT.Exercise.C.DateCreated]
            this.user = dbResult[DT.Exercise.C.User]
            this.exerciseGroup = dbResult[DT.Exercise.C.ExerciseGroup]
            this.name = dbResult[DT.Exercise.C.Name]
            this.note = dbResult[DT.Exercise.C.Note]
            this.exerciseType = dbResult[DT.Exercise.C.ExerciseType]
            this.dailyMax = dbResult[DT.Exercise.C.DailyMax.T]
            this.goal = dbResult[DT.Exercise.C.Goal.T]
        }
        return this.valid
    }

    /**
     * Load data from database
     * @param {String|ObjectID} id - Target ID
     * @returns {Boolean}
     */
    async loadWithID(id) {
        if (typeof (id) === 'string') {
            if (id.length != 24) {
                // TODO Should not return null
                return null
            }
            id = ObjectID(id)
        }
        return await this.loadDBData(await db_exercise.getDataWithID(id))
    }

    /**
     * Reload data from database
     * @returns {Boolean}
     */
    async reload() {
        this.valid = this.loadWithID(this.id)
        return this.valid
    }

    /**
     * Add new Exercise to an Exercise Group
     * @param {ExerciseGroup} exerciseGroup - Exercise Group
     * @param {User} user - Target User
     * @param {String} name - Exercise Name
     * @param {String} note - Exercise Note
     * @param {String} exerciseType - Exercise Type
     */
    async new(exerciseGroup, user, name, note, exerciseType) {
        let result = await db_exercise.addExercise(user.id, exerciseGroup.id, name, note, exerciseType)
        let resultData = result['ops'][0]
        await exerciseGroup.addExerciseID(resultData[DT.Exercise.C.ID])
        await this.loadDBData(resultData)
    }

    /**
     * Deletes the Exercise
     */
    async delete() {
        await db_exercise.removeExercise(this.id)
    }

    /**
     * Add Daily Max to Exercise
     * @param {Date} date - Date
     * @param {Number} value - Exercise Daily Max Value
     */
    async addDailyMaxRecord(date, value) {
        let index = 0
        if (this.dailyMax && this.dailyMax.length > 0) {
            index = this.dailyMax.findIndex(x => date.getTime() < x.date.getTime())
        }
        if (index < 0 || this.dailyMax.length == 0) {
            return await db_exercise.addDailyMaxRecord(this.id, date, value)
        }
        return await db_exercise.addDailyMaxRecordAtIndex(this.id, index, date, value)
    }

    /**
     * Update an existing Exercise Daily Max Record
     * @param {Number} index - Array Index to be Updated
     * @param {Date} date - Exercise Date Value
     * @param {Number} value - Exercise Daily Max Value
     */
    async updateDailyMaxRecord(index, date, value) {
        await db_exercise.updateDailyMaxRecord(this.id, index, date, value)
    }

    /**
     * Delete Daily Max Record
     * @param {Number} index - Array Index to be Deleted
     */
    async deleteDailyMaxRecord(index) {
        await db_exercise.deleteDailyMaxRecord(this.id, index)
    }

    /**
     * Add Goal to Exercise
     * @param {Date} date - Date
     * @param {Number} value - Exercise Goal Value
     */
    async addGoalRecord(date, value) {
        let index = 0
        if (this.goal && this.goal.length > 0) {
            index = this.goal.findIndex(x => date.getTime() < x.date.getTime())
        }
        if (index < 0 || this.goal.length == 0) {
            return await db_exercise.addGoalRecord(this.id, date, value)
        }
        return await db_exercise.addGoalRecordAtIndex(this.id, index, date, value)
    }

    /**
     * Update an existing Exercise Goal Record
     * @param {Number} index - Array Index to be Updated
     * @param {Date} date - Exercise Date Value
     * @param {Number} value - Exercise Goal Value
     */
    async updateGoalRecord(index, date, value) {
        await db_exercise.updateGoalRecord(this.id, index, date, value)
    }

    /**
     * Delete Goal Record
     * @param {Number} index - Array Index to be Deleted
     */
    async deleteGoalRecord(index) {
        await db_exercise.deleteGoalRecord(this.id, index)
    }

    /**
     * Update Exercise Name
     * @param {String} name - Name
     * @returns {String}
     */
    async updateName(name) {
        let result = await db_exercise.updateName(this.id, name)
        if (result) {
            this.name = name
        }
        return this.name
    }

    /**
     * Update Exercise Note
     * @param {String} note - Note
     * @returns {String}
     */
    async updateNote(note) {
        let result = await db_exercise.updateNote(this.id, note)
        if (result) {
            this.note = note
        }
        return this.note
    }

}