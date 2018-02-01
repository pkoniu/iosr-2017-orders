const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

module.exports = (mongodb, eurekaClient) => {
    const app = express();
    
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(cors());
    
    app.get('/test', (req, res, next) => {
        return res.status(200).json({
            message: 'Hello from orders!'
        });
    });

    app.use(jwt({
        secret: 'TURBO_SECRET',
        getToken: function fromHeaderOrQuerystring (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
    }));
    app.use('/v1', require('./v1/api')(mongodb, eurekaClient));

    app.use(require('./error/not-found')());
    app.use(require('./error/general-handler')());
    
    return app;
};
