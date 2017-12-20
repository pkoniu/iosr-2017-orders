module.exports = (ordersRepo) => {
    return (req, res, next) => {
        return ordersRepo.getAll()
            .then(orders => {
                return res.status(200).json(orders);
            }).catch(next);
    };
};
