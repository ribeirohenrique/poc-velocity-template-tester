const mappingTemplate = require('api-gateway-mapping-template');
const fs = require("fs");

const vtl = fs.readFileSync('./src/vtls/exemplo-5.vtl', {encoding: 'utf8'});
const payload = fs.readFileSync('./src/json/httpApiProxy.json', {encoding: 'utf8'});

//o context será passado desta maneira
const params = {
    "querystring": {
        "firstParam": "developer",
        "secondParam": 1,
        "thirdParam": false
    },
    "header": {
        "Accept-Language": "pt-BR",
        "DNT" : true
    }
}

const context = {
    "accountId": "123456789012",
    "resource_path": "/pets",
    "httpMethod": "GET"
};

const result = mappingTemplate({template: vtl, payload: payload, context: context, params: params});
const jsonReturn = JSON.parse(result);

console.log(jsonReturn.testingString);

console.log(jsonReturn)

