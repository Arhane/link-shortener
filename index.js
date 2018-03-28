const express = require('express');
const Buffer = require('buffer').Buffer;
const MongoClient = require('mongodb').MongoClient;
const encode = require('./helpers/decodeEncode').encode;
const decode = require('./helpers/decodeEncode').decode;
const getNextSequence = require('./helpers/getNextSequence');
const app = express();
const port = 3000;

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
    const { link } = req.body;
    const connection = await MongoClient.connect('mongodb://Andrew:ANDr987!Z@ds121091.mlab.com:21091/up-skills');
    const db = await connection.db('up-skills');
    const collection = db.collection('links');
    const id = await getNextSequence('userid', db);
    const document = await collection.insertOne({ id, link });
    res.send({ link: encode(id) });
});

app.get('/:link', async (req, res) => {
    const { link } = req.params;
    const connection = await MongoClient.connect('mongodb://Andrew:ANDr987!Z@ds121091.mlab.com:21091/up-skills');
    const db = await connection.db('up-skills');
    const collection = db.collection('links');
    const document = await collection.findOne({ id: decode(link) });
    console.log('document', document);
    if (document && document.link) {
        res.redirect(`https://${document.link}`);
    } else {
        res.send({ message: 'Could not find the page' })
    }
});


app.listen(port, () => console.log(`Listening to ${port}`));