const CT = require('../constants/codeTables')

exports.Auth = class {
    static get RegistrationDisabled() { return 'Registration is currently disabled' }
    static get InvalidEmailPassword() { return 'Incorrect Email or Password' }
    static get EmailExists() { return 'Email already in use' }
    static get NoMatchPassword() { return 'Passwords do not match' }
}

exports.Database = class {
    static get NotInitialised() {
        const code = 0
        return `${code}: Database not initialised`
    }
}

exports.Args = class {
    static get IncorrectNumberOfArgs() { return 'Incorrect Number of Arguments' }
}

/**
 * Error Status
 * @param {Number} code - Error Code
 * @returns {String}
 */
exports.Status = function (code) {
    return CT.Status.C[code]
}

exports.Schema = class {
    static InvalidSchema(key) { return `Invalid ${key}` }
}