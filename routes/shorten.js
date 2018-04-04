const { MongoClient } = require('mongodb');
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const {encode } = require('../helpers/decodeEncode');
const getNextSequence = require('../helpers/getNextSequence');
const { host, port, dbConfig } = require('../config');
module.exports = async (req, res) => {
    try {
        const { link } = req.body;

        if (link.match(urlRegExp)) {
            const connection = await MongoClient.connect(dbConfig);
            const db = await connection.db('up-skills');
            const collection = db.collection('links');
            const id = await getNextSequence('userid', db);
            await collection.insertOne({ id, link });
            res.send({ link: `http://${host}:${port}/${encode(id)}` });
        } else {
            res.send({ message: 'Link is not correct' })
        }
    } catch (e) {
        res.send({ e })
    }
};
