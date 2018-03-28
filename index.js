const express = require('express');
const Buffer = require('buffer').Buffer;
const MongoClient = require('mongodb').MongoClient;
const encode = require('./helpers/decodeEncode').encode;
const decode = require('./helpers/decodeEncode').decode;
const getNextSequence = require('./helpers/getNextSequence');
const config = require('./config.db');
const app = express();
const host = "127.0.0.1";
const port = 3000;

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
        const connection = await MongoClient.connect(config);
        const db = await connection.db('up-skills');
        const collection = db.collection('links');
        const id = await getNextSequence('userid', db);
        await collection.insertOne({ id, link });
        res.send({ link: `${host}:${port}/${encode(id)}` });
    } catch (e) {
        res.send({ e })
    }
});

app.get('/:link', async (req, res) => {
    const { link } = req.params;
    const connection = await MongoClient.connect(config);
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