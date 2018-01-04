const {
    HEROKU_APP_NAME = 'iosr2017orders'
} = process.env;

module.exports = {
    name: 'iosr2017-orders-pipeline',
    apps: {
        staging: `${HEROKU_APP_NAME}-staging`,
        production: `${HEROKU_APP_NAME}-production`
    },
    owner: 'patryk.konior@gmail.com'
};