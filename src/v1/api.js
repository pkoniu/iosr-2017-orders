const express = require('express');

module.exports = (mongodb) => {
    const app = express();

    const ordersRepo = require('./repositories/local/orders')(mongodb.collection('orders'));
    app.use('/orders', require('./routes/orders')(ordersRepo));

    return app;
};