const _ = require('lodash');

//todo: di maybe?
const menuItemsService = require('./../../../repositories/remote/menu-items')();

module.exports = (ordersRepo) => {
    return (req, res, next) => {
        const newOrderDetails = _.get(req, 'body', {});
        if (areNewOrderDetailsCorrect(newOrderDetails)) {
            return next({
                status: 400,
                message: 'New order details cannot be empty and have to contain id of the menu item to place the order.'
            });
        }

        return menuItemsService.getById(newOrderDetails.id)
            .then(menuItemToOrder => {
                if(menuItemToOrder.length === 0){
                    return next({status: 400, message: "Cannot create order for non-existing menu item"});
                }
                return ordersRepo.createNew(newOrderDetails)
            })
            .then(creationResult => {
                return res.status(201).json(creationResult);
            }).catch(next);
    };
};

function areNewOrderDetailsCorrect(newOrderDetails) {
    return ((Object.keys(newOrderDetails).length === 0) || (!_.has(newOrderDetails, 'id')));
}
