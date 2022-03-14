const CT = require('./codeTables')

exports.Auth = class {
    static EmailExists() { return 'Email already in use' }
    static InvalidEmailPassword() { return 'Incorrect Email or Password' }
    static InvalidHttpMethod(method) { return `Invalid HTTP method: ${method}` }
    static InvalidOldPassword() { return 'Old password isn\'t valid' }
    static InvalidPassword() { return 'Password is invalid' }
    static InvalidPersonalAccessToken() { return 'Invalid Personal Access Token' }
    static InvalidPersonalAccessTokenID() { return 'Invalid Personal Access Token ID' }
    static InvalidRoute() { return 'Invalid route' }
    static InvalidTwoFactorToken() { return 'Invalid 2FA Token' }
    static InvalidUser() { return 'User not found' }
    static NoMatchPassword() { return 'Passwords do not match' }
    static PersonalAccessTokenDisabled() { return 'Personal Access Token is disabled' }
    static TokenExpired() { return 'Token has expired' }
    static TwoFactorAlreadyEnabled() { return 'Two factor authentication is already enabled' }
    static TwoFactorNotEnabled() { return 'Two factor authentication is not enabled' }
    static TwoFactorNotValidated() { return 'Two factor authentication is not validated' }
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

exports.Exercise = class {
    static InvalidExerciseType(type) { return `Invalid Exercise Type: ${type}` }
}