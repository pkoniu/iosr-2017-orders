const _ = require('lodash');

module.exports = (ordersRepo, menuItemsService, clientsService) => {
    return async (req, res, next) => {
        const newOrderDetails = _.get(req, 'body', {});
        if (areNewOrderDetailsCorrect(newOrderDetails)) {
            return next({
                status: 400,
                message: 'New order details cannot be empty and have to contain id of the menu item to place the order and id of the client.'
            });
        }

        const clientServiceResponse = await clientsService.getById(newOrderDetails.forClient);
        const menuServiceResponse = await menuItemsService.getById(newOrderDetails.id);

        if (Object.keys(clientServiceResponse).length === 0 || Object.keys(menuServiceResponse).length === 0) {
            return next({
                status: 400,
                message: "Cannot create order for non-existing menu item or client."
            });
        }

        const creationResult = await ordersRepo.createNew(newOrderDetails);

        return res.status(201).json(creationResult);
    };
};

function areNewOrderDetailsCorrect(newOrderDetails) {
    return ((Object.keys(newOrderDetails).length === 0) || (!_.has(newOrderDetails, 'id')) || (!_.has(newOrderDetails, 'forClient')));
}