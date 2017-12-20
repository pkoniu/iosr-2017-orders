const ObjectId = require('mongodb').ObjectId;

module.exports = () => {
    return {
        getByIdQuery(id) {
            const oId = new ObjectId(id);
            return {_id:oId};
        }
    };
};
