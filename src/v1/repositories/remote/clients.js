const request = require('request');

module.exports = () => {
    const {
        CLIENTS_SERVICE_URL = 'http://localhost:3001'
    } = process.env;

    return {
        getById(id) {
            return new Promise((resolve, reject) => {
                const getClientByIdUrl = `${CLIENTS_SERVICE_URL}/v1/clients/${id}`;
                return request(getClientByIdUrl, (err, result) => {
                    if (err) return reject(err);
                    const responseBody = JSON.parse(result.body);
                    return resolve(responseBody);
                });
            });
        }
    };
};