const express = require('express');

const asyncMiddleware = require('./../../helpers/async-middleware');

module.exports = (ordersRepo) => {
    const app = express();

    app.get('/', require('./handlers/get-all')(ordersRepo));
    app.get('/:id', require('./handlers/get-by-id')(ordersRepo));
    app.post('/', asyncMiddleware(require('./handlers/create-new')(ordersRepo)));
    app.delete('/:id', require('./handlers/delete-by-id')(ordersRepo));
    app.patch('/:id', require('./handlers/update-by-id')(ordersRepo));

    return app;
};
