const request = require('request');

module.exports = (eurekaClient) => {
    var clientsRemoteUrl = null;

    const MAX_RETRY_COUNT = 3;

    function askNextInstance(resolve, reject, retryCounter, requestUrlBuilder){
        const instances = eurekaClient.getInstancesByAppId('clients');
        if(!instances || instances.length == 0 || retryCounter === MAX_RETRY_COUNT){
            clientsRemoteUrl = null;
            return reject({message: 'Clients service unavailable.'});
        }
        if(clientsRemoteUrl === null){
            clientsRemoteUrl = getClientsUrlFromInstance(instances[0]);
        } else if (retryCounter > 0) {
            for(i = 0 ; i < instances.length; i++){
                newUrl = getClientsUrlFromInstance(instances[i]);
                if(newUrl !== clientsRemoteUrl){
                    clientsRemoteUrl = newUrl;
                    break;
                }
                if(i === instances.length - 1){
                    clientsRemoteUrl = null;
                    return reject({message: 'Clients service unavailable.'});
                }
            }
        }

        const getClientByIdUrl = requestUrlBuilder(clientsRemoteUrl);
        return request(getClientByIdUrl, (err, result) => {
            if (err) return askNextInstance(resolve, reject, retryCounter+1, requestUrlBuilder);
            const responseBody = JSON.parse(result.body);
            return resolve(responseBody);
        });

    }

    return {
        getById(id) {
            return new Promise((resolve, reject) => {
                return askNextInstance(resolve, reject, 0, function(clientsRemoteUrl) {
                    return `http://${clientsRemoteUrl}/v1/clients/${id}`;
                });
            });
        }
    };
};

function getClientsUrlFromInstance(instance) {
    if(!instance.hostName){
        return null
    }
    if(instance.hostName === "localhost"){
        return instance.hostName + ":" + instance.port['$']
    }
    return instance.hostName;
}