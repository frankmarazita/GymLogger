const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

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
     * @param {object} filter - Dictionary of query 'projection' {email: 1}
     * @returns {object}
     */
    getOne: async function (collection, data, filter=null) {
        if (db) {
            if (filter) {
                filter = { projection: filter }
            }
            return await dbo.collection(collection).findOne(data, filter)
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
    update: async function (collection, data, item) {
        if (db) {
            return await dbo.collection(collection).updateOne(data, { $set: item })
        }
    },
    /**
     * Update data array in database if entry doesn't already exist
     * @param {string} collection - Name of database collection
     * @param {object} data - Dictionary of search terms {_id: "id"}
     * @param {object} item - Dictionary of items to add {exercisegroups: "id"}
     * @returns
     */
    addArrayItem: async function (collection, data, item) {
        if (db) {
            return await dbo.collection(collection).updateOne(data, { $addToSet: item })
        }
    },
    /**
     * Remove an item form an array collection
     * @param {string} collection - Name of database collection
     * @param {object} data - Dictionary of search terms {_id: "id"}
     * @param {object} item - Dictionary of items to remove {exercisegroups: "id"}
     * @returns
     */
    removeArrayItem: async function (collection, data, item) {
        return await dbo.collection(collection).updateOne(data, { $pull: item })
    },
    /**
     * Delete data in the database
     * @param {string} collection - Name of database collection
     * @param {object} data - Dictionary of search terms {_id: "1234"}
     * @returns
     */
    delete: async function (collection, data) {
        if (db) {
            return await dbo.collection(collection).deleteOne(data)
        }
    }
}