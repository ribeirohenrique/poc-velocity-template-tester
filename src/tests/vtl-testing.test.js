const mappingTemplate = require('api-gateway-mapping-template');
const fs = require("fs");

describe("Testando se recebe os parametros de queryStrings", () => {

    const vtl = fs.readFileSync('./src/vtls/exemplo-5.vtl', {encoding: 'utf8'});
    const payload = fs.readFileSync('./src/json/httpApiProxy.json', {encoding: 'utf8'});

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
        "httpMethod": "GET",
        "statusCode": "200"
    };

    const result = JSON.parse(mappingTemplate({template: vtl, payload: payload, params: params, context: context}));

    test("testing parameters type", () => {

        const result = JSON.parse(mappingTemplate({template: vtl, payload: payload, params: params, context: context}));

        expect(typeof result.queryParametersString).toBe("string");
        expect(typeof result.queryParametersNumber).toBe("number");
        expect(typeof result.queryParametersBoolean).toBe("boolean");

        expect(typeof result.headerParametersString).toBe("string");

        expect(typeof result.queryParametersBoolean).toBe("boolean");
        expect(typeof result.queryParametersString).toBe("string");
        expect(typeof result.queryParametersNumber).toBe("number");
        expect(typeof result.queryParametersBoolean).toBe("boolean");
        expect(result.returnMessage).toBe("Created");
    })

    test("Conditions: testing the message if the status code is different", () => {

        //foi feita uma desestruturação do context, que é uma cópia alterando apenas o campo desejado
        const result = JSON.parse(mappingTemplate({template: vtl, payload: payload, params: params, context: {...context, "statusCode": "404"}}));

        expect(result.returnMessage).toBe("Error");
    })
})