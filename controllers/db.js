const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const CT = require('../constants/code_tables')
const EM = require('../constants/error_messages')
const LM = require('../constants/log_messages')

let db = null
let dbName = null
let dbo = null

module.exports = {
    /**
     * Checks if the database is connected
     * @returns {boolean}
     */
    connected: async function () {
        try {
            if (db) {
                return db.isConnected()
            }
            throw new Error(EM.Database.NotInitialised)
        } catch (err) {
            console.error(err)
            return false
        }
    },
    /**
     * Initialises MongoDB database
     * @param {string} uri - Uniform resource identifier
     * @param {*} name - Database name
     * @returns {Promise<void>}
     */
    init: async function (uri, name) {
        const client = new MongoClient(uri, { useUnifiedTopology: true })
        try {
            return await client.connect().then(response => {
                db = response
                dbName = name
                dbo = db.db(dbName)
                console.log(LM.DatabaseConnected())
            })
        } catch (err) {
            console.error(err)
        }
    },
    /**
     * Close MongoDB database connection
     * @returns
     */
    close: async function () {
        if (db) {
            return await db.close().then(response => {
                console.log(LM.DatabaseDisconnected())
            })
        }
    },
    /**
     * Get data from the database
     * @param {string} collection - Name of database collection
     * @param {object} data - Dictionary of search terms {email: "me@email.com"}
     * @param {boolean} [objectID=false] - If set to true, treats data as a object ID string
     * @returns {object}
     */
    get: async function (collection, data, objectID = false) {
        if (db) {
            if (objectID) {
                data = { '_id': new ObjectId(data) }
            }
            return await dbo.collection(collection).findOne(data)
        }
    },
    /**
     * Get all data from the database
     * @param {string} collection - Name of database collection
     * @param {object} data - Dictionary of search terms {email: "me@email.com"}
     * @param {boolean} [objectID=false] - If set to true, treats data as a object ID string
     * @returns {object}
     */
    getAll: async function (collection, data, objectID = false) {
        if (db) {
            if (objectID) {
                data = { '_id': new ObjectId(data) }
            }
            return await (await dbo.collection(collection).find(data)).toArray()
        }
    },
    /**
     * Set data in the database
     * @param {string} collection - Name of database collection
     * @param {object} data - Dictionary of search terms {email: "me@email.com"}
     * @returns
     */
    set: async function (collection, data) {
        if (db) {
            return await dbo.collection(collection).insertOne(data)
        }
    },
    /**
     * Update data in the database
     * @param {string} collection - Name of database collection
     * @param {string} _id - Id of collection entry
     * @param {object} data - Dictionary of update fields {email: "me@email.com"}
     * @param {boolean} [objectID=false] - If set to true, treats data as a object ID string
     * @returns
     */
    update: async function (collection, _id, data, objectID = false) {
        if (db) {
            if (objectID) {
                _id = new ObjectId(_id)
            }
            return await dbo.collection(collection).updateOne({ _id: _id }, { $set: data })
        }
    },
    /**
     * Update data array in database
     * @param {string} collection - Name of database collection
     * @param {string} _id - Id of collection entry
     * @param {string} field - Array field to add to
     * @param {*} parameter - The new value to set
     * @param {boolean} [objectID=false] - If set to true, treats data as a object ID string
     * @returns
     */
    updateArray: async function (collection, _id, field, parameter, objectID = false) {
        if (db) {
            let item = {}
            item[field] = parameter
            if (objectID) {
                _id = new ObjectId(_id)
            }
            return await dbo.collection(collection).updateOne({ _id: _id }, { $addToSet: item })
        }
    },
    /**
     * Delete data in the database
     * @param {string} collection - Name of database collection
     * @param {string} _id - Id of collection entry
     * @param {boolean} [objectID=false] - If set to true, treats data as a object ID string
     * @returns
     */
    delete: async function (collection, _id, objectID = false) {
        if (db) {
            if (objectID) {
                _id = new ObjectId(_id)
            }
            return await dbo.collection(collection).deleteOne({ _id: _id })
        }
    }
}