const express = require('express');
const Buffer = require('buffer').Buffer;
const app = express();
const port = 3000;

app.post('/shorten', (req, res) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(JSON.parse(chunk.toString()));
    }).on('end', () => {
        console.log('body', body);
    })
});


app.listen(port, () => console.log(`Listening to ${port}`));