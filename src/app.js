const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (mongodb) => {
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

    app.use('/v1', require('./v1/api')(mongodb));
    
    app.use(require('./error/not-found')());
    app.use(require('./error/general-handler')());
    
    return app;
};
