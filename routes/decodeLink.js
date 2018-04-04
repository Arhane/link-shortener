const { decode } = require('../helpers/decodeEncode');
const findLink = require('../db/findLink');
module.exports = async (req, res) => {
    const { link: shortenedLink } = req.params;
    try {
        const link = await findLink(decode(shortenedLink));
        res.redirect(`${link}`);
    } catch (e) {
        res.status(404);
        res.send({ message: e.message });
    }
};
