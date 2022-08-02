const mappingTemplate = require('api-gateway-mapping-template');
const fs = require("fs");

const vtl = fs.readFileSync('./src/vtls/exemplo-5.vtl', { encoding: 'utf8' });
const payload = fs.readFileSync('./src/json/httpApiProxy.json', { encoding: 'utf8' });

//o context será passado desta maneira
const context = {
    "accountId": "123456789012"
};

const params = {
    "querystring": {
        "firstName": "Henrique",
        "lastName": "Mendes"
    }
}

const result = mappingTemplate({template: vtl, payload: payload, context: context, params: params});
console.log(result)

//testar headers da requisição
//query parameters

//comparar a saida usando jest
