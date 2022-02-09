const { ObjectID } = require('bson')
const DT = require('../constants/databaseTables')

const db_user = require('../db/db_user')

const utility = require('../utils/utility')

const ExerciseGroup = require('./ExerciseGroup')

module.exports = class User {
    constructor() {
        this.valid = false
        this.authenticated = false
        this.id = null
        this.dateCreated = null
        this.email = null
        this.name = null
    }

    /**
     * Loads User Data from a data Object
     * @param {Object} data
     * @returns
     */
    async loadWithData(data) {
        this.valid = data != null
        if (this.valid) {
            this.id = data[DT.User.C.ID]
            this.dateCreated = data[DT.User.C.DateCreated]
            this.email = data[DT.User.C.Email]
            this.name = data[DT.User.C.Name]
        }
        return this.valid
    }

    /**
     * Loads the User from ID
     * @param {String} id - User ID
     */
    async loadWithID(id) {
        if (typeof (id) === 'string') {
            if (id.length != 24) {
                // TODO Should not return null
                return null
            }
            id = ObjectID(id)
        }
        return await this.loadWithData(await db_user.getDataWithID(id))
    }

    /**
     * Loads the User from Email
     * @param {String} email - Email
     * @returns
     */
    async loadWithEmail(email) {
        return await this.loadWithData(await db_user.getDataWithEmail(email))
    }

    /**
     * Reloads the User from DB
     * @returns {Boolean}
     */
    async reload() {
        return this.loadWithID(this.id)
    }

    /**
     * Authenticate the User with Password
     * @param {String} password - Password
     * @returns
     */
    async authenticate(password) {
        let user = await db_user.getPasswordHash(this.id)
        let valid = await utility.bcrypt.check(password, user[DT.User.C.PasswordHash])
        this.authenticated = valid === true
        return this.authenticated
    }

    /**
     * Creates a new User
     * @param {String} email - Email
     * @param {String} name - Name
     * @param {String} password - Password
     */
    async new(email, name, password) {
        const passwordHash = await utility.bcrypt.hash(password)
        let result = await db_user.addUser(email, name, passwordHash)
        let resultData = result['ops'][0]
        await this.loadWithData(resultData)
        this.authenticated = true
    }

    /**
     * Get User Session Data For Token
     * @returns {Object}
     */
    sessionData() {
        return {
            authenticated: this.authenticated,
            id: this.id
        }
    }

    /**
     * Add Exercise Group ID to User
     * @param {String} exerciseGroupID - Exercise Group ID
     */
    async addExerciseGroupID(exerciseGroupID) {
        await db_user.addExerciseGroupID(this.id, exerciseGroupID)
    }

    /**
     * Gets an Array of exercise group IDs
     * @returns {Array.<String>}
     */
    async getExerciseGroupIDs() {
        let result = await db_user.getExerciseGroupIDs(this.id)
        this.exerciseGroups = result[DT.User.C.ExerciseGroups]
        return this.exerciseGroups
    }

    /**
     * Gets an Array of exercise groups
     * @returns {Array.<ExerciseGroup>}
     */
    async getExerciseGroups() {
        let exerciseGroups = []
        // TODO Instead of looping through groupids, bulk load groups from a single query to exercisegroups
        if (this.valid) {
            let exerciseGroupIDs = await this.getExerciseGroupIDs()
            if (exerciseGroupIDs) {
                for (let i = 0; i < exerciseGroupIDs.length; i++) {
                    let group = new ExerciseGroup()
                    if (await group.loadWithID(exerciseGroupIDs[i])) {
                        exerciseGroups.push(group)
                    }
                }
            }
        }
        return exerciseGroups
    }

    /**
     * Check user has an Exercise Group
     * @param {String} exerciseGroupID - Exercise Group ID
     * @returns {Boolean}
     */
    async hasExerciseGroup(exerciseGroupID) {
        let exerciseGroupIDs = await this.getExerciseGroupIDs()
        for (let i = 0; i < exerciseGroupIDs.length; i++) {
            if (exerciseGroupIDs[i] == exerciseGroupID) {
                return true
            }
        }
        return false
    }

    /**
     * Add Weight to User
     * @param {Number} value - Exercise Group ID
     */
    async addWeightRecord(value) {
        await db_user.addWeightRecord(this.id, value)
    }

    /**
     * Update an existing User Weight Record
     * @param {Number} index - Index
     * @param {date} date - Date
     * @param {Number} value - Value
     */
    async updateWeightRecord(index, date, value) {
        await db_user.updateWeightRecord(this.id, index, date, value)
    }

    /**
     * Delete Weight Record
     * @param {Number} index - Index
     */
    async deleteWeightRecord(index) {
        await db_user.deleteWeightRecord(this.id, index)
    }

    /**
     * Gets an Array of Weight objects
     * @returns {Array.<Object>}
     */
    async getWeight() {
        let result = await db_user.getWeight(this.id)
        this.weight = result[DT.User.C.Weight.T]
        return this.weight
    }

    /**
     * Update User Email
     * @param {String} email - Email
     * @returns {String}
     */
    async updateEmail(email) {
        let result = await db_user.updateEmail(this.id, email)
        if (result) {
            this.email = email
        }
        return this.email
    }

    /**
     * Update User Name
     * @param {String} name - Name
     * @returns {String}
     */
    async updateName(name) {
        let result = await db_user.updateName(this.id, name)
        if (result) {
            this.name = name
        }
        return this.name
    }

    /**
     * Update User Password
     * @param {String} password - Password
     */
    async updatePassword(password) {
        const passwordHash = await utility.bcrypt.hash(password)
        await db_user.updatePassword(this.id, passwordHash)
    }
}