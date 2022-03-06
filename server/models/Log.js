const DT = require('../constants/databaseTables')

const db_log = require('../db/db_log')

module.exports = class Log {
    constructor() {
        this.valid = false
        this.id = null
        this.dateCreated = null
        this.type = null
        this.message = null
    }

    /**
     * Load data from database
     * @returns {Boolean}
     */
    async loadDBData(dbResult) {
        this.valid = dbResult != null
        if (this.valid) {
            this.id = dbResult[DT.Logs.C.ID]
            this.dateCreated = dbResult[DT.Logs.C.DateCreated]
            this.type = dbResult[DT.Logs.C.Type]
            this.message = dbResult[DT.Logs.C.Message]
        }
        return this.valid
    }

    /**
     * Add DB Config
     * @param {String} name - Name
     * @param {String} version - Version
     * @returns {Boolean}
     */
    async new(type, message) {
        let result = await db_log.add(type, message)
        let resultData = result.ops[0]
        await this.loadDBData(resultData)
        return this.valid
    }
}