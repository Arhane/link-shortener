const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const {encode } = require('../helpers/decodeEncode');
const { host, port } = require('../config');
const insertLink = require('../db/insertLink');
module.exports = async (req, res) => {
    try {
        const { link } = req.body;

        if (link.match(urlRegExp)) {
            await insertLink(link);
            res.send({ link: `http://${host}:${port}/${encode(id)}` });
        } else {
            res.send({ message: 'Link is not correct' })
        }
    } catch (e) {
        res.send({ e })
    }
};
