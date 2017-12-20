const express = require('express');

module.exports = (ordersRepo) => {
    const app = express();

    app.get('/', require('./handlers/get-all')(ordersRepo));
    app.get('/:id', require('./handlers/get-by-id')(ordersRepo));
    app.post('/', require('./handlers/create-new')(ordersRepo));
    app.delete('/:id', require('./handlers/delete-by-id')(ordersRepo));
    app.patch('/:id', require('./handlers/update-by-id')(ordersRepo));

    return app;
};
