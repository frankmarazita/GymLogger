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