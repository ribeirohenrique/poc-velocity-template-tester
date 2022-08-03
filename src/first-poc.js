const mappingTemplate = require('api-gateway-mapping-template');
const fs = require("fs");

const vtl = fs.readFileSync('./src/vtls/exemplo-5.vtl', {encoding: 'utf8'});
const payload = fs.readFileSync('./src/json/httpApiProxy.json', {encoding: 'utf8'});

const params = {
    "querystring": {
        "firstParam": "developer",
        "secondParam": 2022,
        "thirdParam": false
    },
    "header": {
        "Accept-Language": "pt-BR",
        "DNT" : true
    },
    "path": {
        "examplePath": "http://petstore.execute-api.sa-east-1.amazonaws.com/petstore/pets"
    }
}

const context = {
    "accountId": "123456789012",
    "resource_path": "/pets",
    "httpMethod": "GET",
    "stage": "Beta"
};

const result = mappingTemplate({template: vtl, payload: payload, context: context, params: params});
const jsonReturn = JSON.parse(result);

console.log(jsonReturn.testingString);

console.log(jsonReturn)

