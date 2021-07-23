const { ObjectID } = require('bson')
const DT = require('../constants/database_tables')

const db_exercise_group = require('../db/db_exercise_group')

const User = require('./User')
const Exercise = require('./Exercise')

module.exports = class ExerciseGroup {
    constructor() {
        this.id = null
        this.user = null
        this.dateCreated = null
        this.name = null
        this.note = null
        this.exercises = null

        this.valid = false
    }

    /**
     * Load data from database
     * @returns {Boolean}
     */
    async loadDBData(dbResult) {
        this.valid = dbResult != null
        if (this.valid) {
            this.id = dbResult[DT.ExerciseGroup.C.ID]
            this.user = dbResult[DT.ExerciseGroup.C.User]
            this.dateCreated = dbResult[DT.ExerciseGroup.C.DateCreated]
            this.name = dbResult[DT.ExerciseGroup.C.Name]
            this.note = dbResult[DT.ExerciseGroup.C.Note]
            this.exercises = dbResult[DT.ExerciseGroup.C.Exercises]
        }
        return this.valid
    }

    /**
     * Load data from database
     * @param {String|ObjectID} id - Target id
     * @returns {Boolean}
     */
    async loadWithID(id) {
        if (typeof (id) === 'string') {
            if (id.length != 24) {
                return null
            }
            id = ObjectID(id)
        }
        return await this.loadDBData(await db_exercise_group.getDataWithID(id))
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
     * Add new Exercise Group to a User
     * @param {User} user - Target User
     * @param {String} name - Exercise Group Name
     * @param {String} note - Exercise Group Note
     */
    async new(user, name, note) {
        let result = await db_exercise_group.addExerciseGroup(user.id, name, note)
        let resultData = result['ops'][0]
        await user.addExerciseGroupID(resultData[DT.ExerciseGroup.C.ID])
        await this.loadDBData(resultData)
    }

    /**
     * Add Exercise ID to Group
     * @param {String} exerciseID - Exercise ID
     */
    async addExerciseID(exerciseID) {
        await db_exercise_group.addExerciseID(this.id, exerciseID)
    }

    /**
     * Gets an Array of exercise IDs
     * @returns {Array.<String>}
     */
    async getExerciseIDs() {
        let result = await db_exercise_group.getExerciseIDs(this.id)
        this.exercises = result[DT.ExerciseGroup.C.Exercises]
        return this.exercises
    }

    /**
     * Remove an Exercise from the Group
     * @param {*} exerciseID
     */
    async removeExercise(exerciseID) {
        await db_exercise_group.removeExerciseID(this.id, exerciseID)
    }

    /**
     * Gets an Array of exercises
     * @returns {Array.<Exercise>}
     */
    async getExercises() {
        let exercises = []
        // TODO Instead of looping through exercise ids, bulk load exercises from a single query to exercises
        if (this.valid) {
            let exerciseIDs = await this.getExerciseIDs()
            for (let i = 0; i < exerciseIDs.length; i++) {
                let exercise = new Exercise()
                if (await exercise.loadWithID(exerciseIDs[i])) {
                    exercises.push(exercise)
                }
            }
        }
        return exercises
    }

    /**
     * Update Exercise Group Name
     * @param {String} name - Name
     * @returns
    */
    async updateName(name) {
        let result = await db_exercise_group.updateName(this.id, name)
        if (result) {
            this.name = name
        }
        return this.name
    }

    /**
     * Update Exercise Group Note
     * @param {String} note - Note
     * @returns
     */
    async updateNote(note) {
        let result = await db_exercise_group.updateNote(this.id, note)
        if (result) {
            this.note = note
        }
        return this.note
    }
}