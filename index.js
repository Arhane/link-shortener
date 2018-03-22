const express = require('express');
const app = express();
const port = 3000;

app.post('/shorten', (req, res) => {
    console.log('req', req);
});


app.listen(port, () => console.log(`Listening to ${port}`));