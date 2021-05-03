const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let db = null;
let dbName = null;
let dbo = null;

exports.init = async function (uri, name) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect().then(response => {
            db = response;
            dbName = name;
            dbo = db.db(dbName);
            console.log("Connected to MongoDB");
        });
    } catch (e) {
        console.error(e);
    }
}

exports.close = async function () {
    db.close();
}

exports.get = async function (collection, data, objectID=false) {
    // collection - name of database collection
    // data - dictionary of search fields
    // objectID - set to true, and treats data as a object ID string
    if (db) {
        if (objectID) {
            data = { '_id': new ObjectId(data) };
        }
        return await dbo.collection(collection).findOne(data);
    }
}

exports.getAll = async function (collection, data, objectID=false) {
    // collection - name of database collection
    // data - dictionary of search fields
    // objectID - set to true, and treats data as a object ID string
    if (db) {
        if (objectID) {
            data = { '_id': new ObjectId(data) };
        }
        return await (await dbo.collection(collection).find(data)).toArray();
    }
}

exports.set = async function (collection, data) {
    // collection - name of database collection
    // data - dictionary of search fields
    if (db) {
        return await dbo.collection(collection).insertOne(data);
    }
}

exports.update = async function (collection, _id, data, objectID=false) {
    // collection - name of database collection
    // _id - id of collection entry
    // data - dictionary of edit fields
    if (db) {
        if (objectID) {
            _id = new ObjectId(_id);
        }
        return await dbo.collection(collection).updateOne({ _id: _id }, { $set: data });
    }
}

exports.updateArray = async function (collection, _id, field, parameter, objectID = false) {
    // collection - name of database collection
    // _id - id of collection entry
    // field - array field to add to
    // parameter - the value to add
    if (db) {
        let item = {};
        item[field] = parameter;
        if (objectID) {
            _id = new ObjectId(_id);
        }
        return await dbo.collection(collection).updateOne({ _id: _id }, { $addToSet: item });
    }
}

exports.delete = async function (collection, _id, objectID = false) {
    // collection - name of database collection
    // _id - id of collection entry
    if (db) {
        if (objectID) {
            _id = new ObjectId(_id);
        }
        return await dbo.collection(collection).deleteOne({ _id: _id });
    }
}