const express = require('express');

module.exports = (mongodb, eurekaClient) => {
    const app = express();

    const ordersRepo = require('./repositories/local/orders')(mongodb.collection('orders'));
    const menuItemsService = require('./repositories/remote/menu-items')(eurekaClient);
    const clientsService = require('./repositories/remote/clients')(eurekaClient);
    app.use('/orders', require('./routes/orders')(ordersRepo, menuItemsService, clientsService));

    return app;
};