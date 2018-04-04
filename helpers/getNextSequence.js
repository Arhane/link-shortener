const { collections: { counters } } = require('../constants');
const getNextSequence = async (db) => {
    const ret = db.collection(counters).findOneAndUpdate(
            { id: 'userid' }
        ,
        {
             $inc: { seq: 1 }
        },
        {
            projection: {'seq': 1},
            returnOriginal: false
        }
    );
    const updatedDoc = await ret;

    return updatedDoc.value.seq;
};

module.exports = getNextSequence;
