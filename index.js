const express = require('express');
const Buffer = require('buffer').Buffer;
const app = express();
const port = 3000;

app.post('/shorten', (req, res) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        console.log('body', body);
    })
});


app.listen(port, () => console.log(`Listening to ${port}`));