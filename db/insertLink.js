const { MongoClient } = require('mongodb');
const getNextSequence = require('../helpers/getNextSequence');
const { dbConfig } = require('../config');
const { dbName, collections: { links } } = require('../constants');

module.exports = async (link) => {
    const connection = await MongoClient.connect(dbConfig);
    const db = await connection.db(dbName);
    const collection = db.collection(links);
    const id = await getNextSequence(db);
    return collection.insertOne({ id, link });
};
