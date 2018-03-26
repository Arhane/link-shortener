const express = require('express');
const Buffer = require('buffer').Buffer;
const encode = require('./helpers/decodeEncode').encode;
const decode = require('./helpers/decodeEncode').decode;
const app = express();
const port = 3000;

app.use((req, res, next) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        req.body = JSON.parse(Buffer.concat(body).toString());
        next();
    })
});

app.post('/shorten', (req, res) => {
});


app.listen(port, () => console.log(`Listening to ${port}`));