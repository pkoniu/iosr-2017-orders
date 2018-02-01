const request = require('request');

module.exports = (eurekaClient) => {

    var menuItemsRemoteUrl = null;

    const MAX_RETRY_COUNT = 3;

    function askNextInstance(resolve, reject, retryCounter, requestUrlBuilder){
        const instances = eurekaClient.getInstancesByAppId('menu');
        if(!instances || instances.length == 0 || retryCounter === MAX_RETRY_COUNT){
            menuItemsRemoteUrl = null;
            return reject({message: 'Menu items service unavailable.'});
        }
        if(menuItemsRemoteUrl === null){
            menuItemsRemoteUrl = getMenuUrlFromInstance(instances[0]);
        } else if (retryCounter > 0) {
            for(i = 0 ; i < instances.length; i++){
                newUrl = getMenuUrlFromInstance(instances[i]);
                if(newUrl !== menuItemsRemoteUrl){
                    menuItemsRemoteUrl = newUrl;
                    break;
                }
                if(i === instances.length - 1){
                    menuItemsRemoteUrl = null;
                    return reject({message: 'Menu items service unavailable.'});
                }
            }
        }

        const getMenuByIdUrl = requestUrlBuilder(menuItemsRemoteUrl);
        return request(getMenuByIdUrl, (err, result) => {
            if (err) return askNextInstance(resolve, reject, retryCounter+1, requestUrlBuilder);
            const responseBody = JSON.parse(result.body);
            return resolve(responseBody);
        });

    }

    return {
        getById(id) {
            return new Promise((resolve, reject) => {
                return askNextInstance(resolve, reject, 0, function(menuItemsRemoteUrl) {
                    return `http://${menuItemsRemoteUrl}/v1/menu/items/${id}`;
                });
            });
        }
    };
}


function getMenuUrlFromInstance(instance) {
    if(!instance.hostName){
        return null
    }
    if(instance.hostName === "localhost"){
        return instance.hostName + ":" + instance.port['$']
    }
    return instance.hostName;
}