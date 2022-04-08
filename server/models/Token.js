const DT = require('../constants/databaseTables')

const db_token = require('../db/db_token')

module.exports = class Token {
    constructor() {
        this.valid = false
        this.id = null
        this.dateCreated = null
        this.enabled = null
        this.user = null
        this.expiry = null
        this.note = null
        this.scope = null
    }

    /**
     * Load data from database
     * @returns {Boolean}
     */
    async loadDBData(dbResult) {
        this.valid = dbResult != null
        if (this.valid) {
            this.id = dbResult[DT.Token.C.ID]
            this.dateCreated = dbResult[DT.Token.C.DateCreated]
            this.enabled = dbResult[DT.Token.C.Enabled]
            this.user = dbResult[DT.Token.C.User]
            this.expiry = dbResult[DT.Token.C.Expiry]
            this.note = dbResult[DT.Token.C.Note]
            this.scope = dbResult[DT.Token.C.Scope.T]
        }
        return this.valid
    }

    /**
     * Add Token
     * @param {String} userID - User ID
     * @param {Date} expiry - Token Expiry
     * @param {String} note - Note
     * @param {Object} scope - Scope
     * @returns {Boolean}
     */
    async new(userID, expiry, note, scope) {
        let result = await db_token.add(userID, expiry, note, scope)
        let resultData = result.ops[0]
        await this.loadDBData(resultData)
        return this.valid
    }

    /**
     * Get Personal Access Token Data For Token
     * @returns {Object}
     */
    sessionData() {
        return {
            id: this.id,
            note: this.note
        }
    }

    /**
     * Load data from database
     * @param {String|ObjectID} id - Target id
     * @returns {Boolean}
    */
    async loadWithID(tokenID) {
        return await this.loadDBData(await db_token.getDataByID(tokenID))
    }

    /**
     * Reload data from database
     * @returns {Boolean}
     */
    async reload() {
        this.valid = await this.load(this.id)
        return this.valid
    }

    async updateEnabled(enabled) {
        let result = await db_token.updateEnabled(this.id, enabled)
        if (result) {
            this.enabled = enabled
        }
        return this.enabled
    }

    async delete() {
        return await db_token.delete(this.id)
    }
}