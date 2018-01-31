const {
    HEROKU_APP_NAME = 'iosr2017orders'
} = process.env;

module.exports = {
    staging: {
        acm: false,
        name: `${HEROKU_APP_NAME}-staging`,
        region: 'eu',
        maintenance: false,
        stack: 'heroku-16',
        config_vars: {
            NODE_ENV: 'staging',
            CLIENTS_SERVICE_URL: 'http://iosr2017clients-staging.herokuapp.com',
            MENU_SERVICE_URL: 'http://iosr2017menu-staging.herokuapp.com',
            EUREKA_APP_HOST_NAME: `${HEROKU_APP_NAME}-staging.herokuapp.com`,
            EUREKA_APP_IP_ADDR: '127.0.0.1',
            EUREKA_APP_VIP_ADDR: `${HEROKU_APP_NAME}-staging.herokuapp.com`,
            EUREKA_SERVER_URL: 'https://user:iosr2017@iosr2017eureka-staging.herokuapp.com/eureka/apps'
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
        },
        collaborators: [
            'patryk.konior@gmail.com',
            'stawickipiotr94@gmail.com'
        ]
    },
    production: {
        acm: false,
        name: `${HEROKU_APP_NAME}-production`,
        region: 'eu',
        maintenance: false,
        stack: 'heroku-16',
        config_vars: {
            NODE_ENV: 'production',
            CLIENTS_SERVICE_URL: 'http://iosr2017clients-production.herokuapp.com',
            MENU_SERVICE_URL: 'http://iosr2017menu-production.herokuapp.com',
            EUREKA_APP_HOST_NAME: `${HEROKU_APP_NAME}-production.herokuapp.com`,
            EUREKA_APP_IP_ADDR: '127.0.0.1',
            EUREKA_APP_VIP_ADDR: `${HEROKU_APP_NAME}-production.herokuapp.com`,
            EUREKA_SERVER_URL: 'https://user:iosr2017@iosr2017eureka-production.herokuapp.com/eureka/apps'
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
        },
        collaborators: [
            'patryk.konior@gmail.com',
            'stawickipiotr94@gmail.com'
        ]
    }
};