const { urlRegExp } = require('../constants');
const {encode } = require('../helpers/decodeEncode');
const { host, port } = require('../config');
const insertLink = require('../db/insertLink');
module.exports = async (req, res) => {
    const { link } = req.body;

    if (link.match(urlRegExp)) {
        const id = await insertLink(link);
        res.send({ link: `http://${host}:${port}/lk${encode(id)}` });
    } else {
        res.status(404);
        res.send({message: 'Link is not correct'})
    }
};
