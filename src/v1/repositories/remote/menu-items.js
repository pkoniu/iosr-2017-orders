const request = require('request');

module.exports = () => {
    const {
        MENU_SERVICE_URL = 'http://localhost:3002'
    } = process.env;

    return {
        getById(id) {
            return new Promise((resolve, reject) => {
                const getMenuByIdUrl = `${MENU_SERVICE_URL}/v1/menu/items/${id}`;
                return request(getMenuByIdUrl, (err, result) => {
                    if (err) return reject(err);
                    const responseBody = JSON.parse(result.body);
                    return resolve(responseBody);
                });
            });
        }
    };
};