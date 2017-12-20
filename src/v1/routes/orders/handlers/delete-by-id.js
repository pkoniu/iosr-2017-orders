const _ = require('lodash');

module.exports = (ordersRepo) => {
    return (req, res, next) => {
        const id = _.get(req, 'params.id');
        return ordersRepo.deleteOne(id)
            .then(deletionResult => {
                return res.status(200).json(deletionResult);
            }).catch(next);
    };
};
