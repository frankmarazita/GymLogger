exports.DB = class {
    static Connected(dbName) {
        return `Connected to MongoDB (${dbName})`
    }
    static Disconnected() {
        return 'Disconnected from MongoDB'
    }
}

exports.Server = class {
    static Opened(port) {
        return `Server listening to port ${port}`
    }
    static Closed() {
        return 'Server Closed'
    }
}