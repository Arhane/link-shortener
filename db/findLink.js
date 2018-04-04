const { MongoClient } = require('mongodb');
const { dbConfig } = require('../config');
const { dbName, collections: { links } } = require('../constants');

module.exports = async (id) => {
    const connection = await MongoClient.connect(dbConfig);
    const db = await connection.db(dbName);
    const collection = db.collection(links);
    const document = await collection.findOne({ id });
    if (document && document.link) {
        return document.link;
    } else {
        throw new Error('Could not find the page')
    }
};
