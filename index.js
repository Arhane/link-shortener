const express = require('express');
const Buffer = require('buffer').Buffer;
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
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const base = alphabet.length;
    const longUrl = 'qweqwe';
    let shortUrl = '';
    let id = 5000;
    while (id) {
        shortUrl += (alphabet[id%62]);
        id = Math.round(id/62);
    }
    console.log('shortUrl', shortUrl);
    console.log('decode(shortUrl)', decode(shortUrl));
    console.log('req.body', req.body);
});

function decode(shortURL){
    let id = 0; // initialize result
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const base = alphabet.length;

    // A simple base conversion logic
    // shortURL.split('').forEach((letter) => id = alphabet.split('').findIndex((item) => item === letter) + id * 62);

    return id;
}


app.listen(port, () => console.log(`Listening to ${port}`));