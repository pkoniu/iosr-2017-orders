const heroin = require('heroin-js');

const {
    HEROKU_AUTH_TOKEN
} = process.env;

const configurator = heroin(HEROKU_AUTH_TOKEN);
const configs = require('./app-configuration');
const pipelineConfig = require('./pipeline-configuration');

console.log('=== Setting up infrastructure for staging on Heroku ===');
configurator(configs.staging)
    .then(result => {
        console.log('=== Setting up infrastructure for production on Heroku ===');
        return configurator(configs.production);
    })
    .then(result => {
        console.log('=== Apps prepared ===')
        console.log('=== Setting up pipelines ===')
        return configurator.pipeline(pipelineConfig);
    }).then(result => {
    console.log('=== Pipelines prepared ===');
    return process.exit(0);
}).catch(error => {
    console.log(error);
    process.exit(1);
});