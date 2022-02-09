const CT = require('../constants/codeTables')

exports.Auth = class {
    static InvalidEmailPassword() { return 'Incorrect Email or Password' }
    static InvalidOldPassword() { return 'Old password isn\'t valid' }
    static InvalidUser() { return 'User not found' }
    static EmailExists() { return 'Email already in use' }
    static NoMatchPassword() { return 'Passwords do not match' }
}

exports.DB = class {
    static NotInitialised() {
        return 'Database not initialised'
    }
    static ConfigVersionMismatch(db, sys) {
        return `Database version mismatch. Expected ${sys}, got ${db}`
    }
    static ConfigEnvironmentMismatch (db, sys) {
        return `Database environment mismatch. Expected ${sys}, got ${db}`
    }
}

exports.Args = class {
    static IncorrectNumberOfArgs() { return 'Incorrect Number of Arguments' }
}

/**
 * Error Status
 * @param {Number} code - Error Code
 * @returns {String}
 */
exports.Status = function (code) {
    return CT.Status[code]
}

exports.Schema = class {
    static InvalidSchema(key) { return `Invalid ${key}` }
}