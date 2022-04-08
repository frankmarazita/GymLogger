const { ObjectID } = require('bson')

const config = require('../config/config')

const DT = require('../constants/databaseTables')
const EM = require('../constants/errorMessages')

const db_db_config = require('../db/db_db_config')

module.exports = class DBConfig {
    constructor() {
        this.valid = false
        this.id = null
        this.dateCreated = null
        this.name = null
        this.version = null
        this.environment = null
    }

    /**
     * Load data from database
     * @returns {Boolean}
     */
    async loadDBData(dbResult) {
        this.valid = dbResult != null
        if (this.valid) {
            this.id = dbResult[DT.DBConfig.C.ID]
            this.dateCreated = dbResult[DT.DBConfig.C.DateCreated]
            this.name = dbResult[DT.DBConfig.C.Name]
            this.version = dbResult[DT.DBConfig.C.Version]
            this.environment = dbResult[DT.DBConfig.C.Environment]
        }
        return this.valid
    }

    /**
     * Load data from database
     * @param {String|ObjectID} id - Target id
     * @returns {Boolean}
    */
    async load() {
        return await this.loadDBData(await db_db_config.get())
    }

    /**
     * Reload data from database
     * @returns {Boolean}
     */
    async reload() {
        this.valid = await this.load()
        return this.valid
    }

    /**
     * Add DB Config
     * @param {String} name - Name
     * @param {String} version - Version
     * @returns {Boolean}
     */
    async new(name, version, environment) {
        let result = await db_db_config.add(name, version, environment)
        let resultData = result.ops[0]
        await this.loadDBData(resultData)
        return this.valid
    }

    /**
     * Validate DB Config
     * @returns {Boolean}
     * @throws {Error}
     */
    async validate() {
        if (!this.valid) {
            // Add a new config if not found
            await this.new(process.env.DB_NAME, config.system.version, process.env.NODE_ENV)
        } else {
            // Check if config is up to date
            if (this.environment != process.env.NODE_ENV) {
                throw new Error(EM.DB.ConfigEnvironmentMismatch(this.environment, process.env.NODE_ENV))
            } else if (this.version != config.system.version) {
                throw new Error(EM.DB.ConfigVersionMismatch(this.version, config.system.version))
            }
        }
        return true
    }

    /**
     * Update DB Config Name
     * @param {String} name - Name
     * @returns {Boolean}
     */
    async updateName(name) {
        let result = await db_db_config.updateName(name)
        let resultData = result.ops[0]
        await this.loadDBData(resultData)
        return this.valid
    }

    /**
     * Update DB Config Version
     * @param {String} version - Version
     * @returns {Boolean}
     */
    async updateVersion(version) {
        let result = await db_db_config.updateVersion(version)
        let resultData = result.ops[0]
        await this.loadDBData(resultData)
        return this.valid
    }
}