const express = require('express');
const Buffer = require('buffer').Buffer;
const { MongoClient } = require('mongodb');
const {encode, decode } = require('./helpers/decodeEncode');
const getNextSequence = require('./helpers/getNextSequence');
const { host, port, db } = require('./config');
const app = express();
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

app.use(express.static('static'));
app.use((req, res, next) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        if (body.length !== 0) {
            req.body = JSON.parse(Buffer.concat(body).toString());
        }
        next();
    })
});

app.post('/shorten', async (req, res) => {
    try {
        const { link } = req.body;

        if (link.match(urlRegExp)) {
            const connection = await MongoClient.connect(db);
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
});

app.get('/:link', async (req, res) => {
    const { link } = req.params;
    const connection = await MongoClient.connect(db);
    const db = await connection.db('up-skills');
    const collection = db.collection('links');
    const document = await collection.findOne({ id: decode(link) });
    if (document && document.link) {
        res.redirect(`${document.link}`);
    } else {
        res.send({ message: 'Could not find the page' })
    }
});


app.listen(port, host, () => console.log(`Listening to ${port}`));