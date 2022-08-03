const mappingTemplate = require('api-gateway-mapping-template');
const fs = require("fs");

describe("Testando os parametros de input", () => {
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

    test("testing parameters type", () => {
        const result = JSON.parse(mappingTemplate({template: vtl, payload: payload, params: params, context: context}));

        //Testing Query Parameters
        expect(typeof result.queryParametersString).toBe("string");
        expect(typeof result.queryParametersNumber).toBe("number");
        expect(typeof result.queryParametersBoolean).toBe("boolean");

        //Testing Header Parameters
        expect(typeof result.headerParametersString).toBe("string");
        expect(typeof result.headerParametersBoolean).toBe("boolean");

        //Testing Path Parameters
        expect(result.pathParameters).toContain("/");

        //Testing utils to remove \\' from the String
        expect(result.testEscapedQuote).not.toContain("\\'");

        //Testing stage message by choosing stage on $context based in a condition
        expect(result.stage).toBe("This API is in Beta Development");
    })

    test("Conditions: choosing stage on $context", () => {

        const result = JSON.parse(mappingTemplate({template: vtl, payload: payload, params: params, context: {...context, "stage": "Prod"}}));

        expect(result.forEachCount).toBe(5);
        expect(result.forEachIndex).toBe(4);
        expect(result.forEachHasNext).toBe(false);
    })
})