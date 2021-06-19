const CT = require('../constants/code_tables')

exports.Database = class {
    static get NotInitialised() {
        const code = 0
        return `${code}: Database not initialised`
    }
}

exports.Auth = class {
    static get InvalidEmailPassword() { return 'Incorrect Email or Password' }
    static get EmailExists() { return 'Email already in use' }
    static get NoMatchPassword() { return 'Passwords do not match' }
}

exports.Response = function (code) {
    return CT.Response.C[code]
}