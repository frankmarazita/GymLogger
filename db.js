const response = require('express');
const request = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let db = null;
let databaseName = null;

exports.init = async function (uri, name) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect().then(response => {
            db = response;
            databaseName = name;
            console.log("Connected to MongoDB");
        });
    } catch (e) {
        console.error(e);
    }
}

exports.get = async function (collection, data, objectID=false) {
    // collection - name of database collection
    // data - dictionary of search fields
    // objectID - set to true, and treats data as a object ID string
    if (db) {
        let dbo = db.db(databaseName);
        if (objectID) {
            data = { '_id': new ObjectId(data) };
        }
        return await dbo.collection(collection).findOne(data);
    }
}

exports.set = async function (collection, data) {
    // collection - name of database collection
    // data - dictionary of search fields
    if (db) {
        let dbo = db.db(databaseName);
        return await dbo.collection(collection).insertOne(data);
    }
}

exports.update = async function (collection, _id, field, parameter) {
    let item = {};
    item[field] = parameter;
    let dbo = db.db(databaseName);
    return await dbo.collection(collection).updateOne({ _id: _id }, { $addToSet: item });
}