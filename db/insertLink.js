const { MongoClient } = require('mongodb');
const getNextSequence = require('../helpers/getNextSequence');
const { dbConfig } = require('../config');

module.exports = async (link) => {
    const connection = await MongoClient.connect(dbConfig);
    const db = await connection.db('up-skills');
    const collection = db.collection('links');
    const id = await getNextSequence('userid', db);
    return collection.insertOne({ id, link });
};
