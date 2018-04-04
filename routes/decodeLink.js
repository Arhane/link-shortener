const { decode } = require('../helpers/decodeEncode');
const findLink = require('../db/findLink');
module.exports = async (req, res) => {
    const { link } = req.params;
    try {
        const link = await findLink(decode(link));
        res.redirect(`${link}`);
    } catch (e) {
        res.send({ message: e.message })
    };
}
