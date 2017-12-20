const _ = require('lodash');

module.exports = (ordersRepo) => {
    return (req, res, next) => {
        const id = _.get(req, 'params.id');
        return ordersRepo.getById(id)
            .then(order => {
                return res.status(200).json(order);
            }).catch(next);
    };
};
