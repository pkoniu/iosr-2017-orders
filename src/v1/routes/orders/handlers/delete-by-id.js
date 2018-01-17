const _ = require('lodash');

module.exports = (ordersRepo) => {
    return async (req, res, next) => {
        try {
            const id = _.get(req, 'params.id');
            const deletionResult = await ordersRepo.deleteOneWithStatus(id, "unpaid")
            if(deletionResult && deletionResult.deletedOrder){
                return res.status(200).json(deletionResult)
            }
            const findResult = await ordersRepo.getById(id)
            if(findResult && findResult.length && findResult.length > 0) {
                return res.status(400).json({"message": "Order with given ID has already been paid, and cannot be deleted."})
            }
            return res.status(400).json({"message": "Order with given ID doesn't exist."})
        } catch (error){
            return next(error)
        }
    };
};
