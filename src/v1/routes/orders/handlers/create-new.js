const _ = require('lodash');

//todo: di maybe?
const menuItemsService = require('./../../../repositories/remote/menu-items')();

module.exports = (ordersRepo) => {
    return (req, res, next) => {
        const newOrderDetails = _.get(req, 'body', {});

        if (Object.keys(newOrderDetails).length === 0) {
            return next({
                status: 400,
                message: 'New order details cannot be empty.'
            });
        }

        return menuItemsService.getById(newOrderDetails.id)
            .then(menuItemToOrder => {
                return ordersRepo.createNew(newOrderDetails)
            })
            .then(creationResult => {
                return res.status(201).json(creationResult);
            }).catch(next);
    };
};
