const {
    HEROKU_APP_NAME = 'iosr2017orders'
} = process.env;

module.exports = {
    acm: false,
    name: HEROKU_APP_NAME,
    region: 'eu',
    maintenance: false,
    stack: 'container',
    config_vars: {
        NODE_ENV: 'production'
    },
    addons: {
        librato: {
            plan: 'librato:development'
        },
        logentries: {
            plan: 'logentries:le_tryit'
        },
        mongolab: {
            plan: 'mongolab:sandbox'
        }
    }
};