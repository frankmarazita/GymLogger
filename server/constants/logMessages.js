exports.DatabaseConnected = function () {
    return 'Connected to MongoDB'
}
exports.DatabaseDisconnected = function () {
    return 'Disconnected from MongoDB'
}
exports.ServerOpened = function (port) {
    return `Server listening to port ${port}`
}
exports.ServerClosed = function () {
    return 'Server Closed'
}
exports.DBConfigVersionMismatch = function (db, sys) {
    return `Database version mismatch. Expected ${sys}, got ${db}`
}
exports.DBConfigEnvironmentMismatch = function (db, sys) {
    return `Database environment mismatch. Expected ${sys}, got ${db}`
}