const api = require('api-gateway-template-tester');
const fs = require("fs");

const template = fs.readFileSync('./velocity-template.vm', { encoding: 'utf8' });

const request = fs.readFileSync('./example-request.json', { encoding: 'utf8' });

const variables = { IAMExecutionRoleName: 'api-gateway-execution-role-1j39gja' };

//const setup = api.stageVariables(variables).context({ apiId: '2ja29tjJJ9jd' });
const setup = api().stageVariables(variables).context({ apiId: '2ja29tjJJ9jd' });

const test = setup().body(request)
    .pathParameters({ id: 1 })
    .headers({ 'X-Custom-Header': '1234567890' })
    .queryStrings({ book: 9 });

test.render(template);