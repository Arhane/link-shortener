const { MongoClient } = require('mongodb');
const { decode } = require('../helpers/decodeEncode');
const { dbConfig } = require('../config');
module.exports = async (req, res) => {
    const { link } = req.params;
    const connection = await MongoClient.connect(dbConfig);
    const db = await connection.db('up-skills');
    const collection = db.collection('links');
    const document = await collection.findOne({ id: decode(link) });
    if (document && document.link) {
        res.redirect(`${document.link}`);
    } else {
        res.send({ message: 'Could not find the page' })
    }
}
