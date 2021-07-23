const CT = require('../constants/code_tables')

exports.Auth = class {
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