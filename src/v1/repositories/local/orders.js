const _ = require('lodash');

const queriesBuilder = require('./queries-builder')();

module.exports = (collection) => {
    return {
        getAll(userid) {
            console.log(userid);
            return collection.find({forClient: userid}).toArray();
        },
        getById(id) {
            const filter = queriesBuilder.getByIdQuery(id);
            return collection.find(filter).toArray();
        },
        createNew(details) {
            return collection.insertOne(Object.assign(details,{status: "unpaid"}))
                .then(insertResponse => {
                    const createdOrder = _.get(insertResponse, 'ops.0', {});
                    return {
                        createdOrder
                    };
                });
        },
        deleteOne(id) {
            const filter = queriesBuilder.getByIdQuery(id);
            return collection.findOneAndDelete(filter)
                .then(deleteResponse => {
                    const deletedOrder = _.get(deleteResponse, 'value', {});
                    return {
                        deletedOrder
                    };
                });
        },
        deleteOneWithStatus(id, status) {
                    const filter = queriesBuilder.getByIdAndStatusQuery(id, status);
                    return collection.findOneAndDelete(filter)
                        .then(deleteResponse => {
                            const deletedOrder = _.get(deleteResponse, 'value', {});
                            return {
                                deletedOrder
                            };
                        });
                },
        updateOne(id, toUpdate) {
            const filter = queriesBuilder.getByIdQuery(id);
            const update = {$set: toUpdate};
            const options = {returnOriginal: false};
            debugger;
            return collection.findOneAndUpdate(filter, update, options)
                .then(updateResponse => {
                    const updatedOrder = _.get(updateResponse, 'value', {});
                    return {updatedOrder};
                });
        }
    };
};