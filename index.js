const express = require('express');
const Buffer = require('buffer').Buffer;
const { MongoClient } = require('mongodb');
const {encode, decode } = require('./helpers/decodeEncode');
const getNextSequence = require('./helpers/getNextSequence');
const { host, port, dbConfig } = require('./config');
const shorten = require('./routes/shorten');
const decodeLink = require('./routes/decodeLink');
const app = express();

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

app.post('/shorten', shorten);

app.get('/:link', decodeLink);


app.listen(port, host, () => console.log(`Listening to ${port}`));