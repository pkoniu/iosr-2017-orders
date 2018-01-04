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
            NODE_ENV: 'staging'
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
        },
        collaborators: [
            'patryk.konior@gmail.com',
            'stawickipiotr94@gmail.com'
        ]
    }
};