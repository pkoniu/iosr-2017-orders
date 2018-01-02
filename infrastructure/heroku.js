const heroin = require('heroin-js');

const configurator = heroin(process.env.HEROKU_AUTH_TOKEN);
const configuration = require('./configuration');

configurator(configuration)
    .then(result => {
        console.log(result);
        process.exit(0);
    }).catch(error => {
        console.log(error);
        process.exit(1);
    });