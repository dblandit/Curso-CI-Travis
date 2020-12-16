const app = require('../app');
const request = require('supertest')(app);
const { getToken, requestWrapper } = require('../utils/testUtils');

let requestGenerator;

process.env.DB_NAME = 'facturas';

beforeAll(async () => {
    const token = await getToken(request);
    requestGenerator = requestWrapper(request, token);
});

describe.each`
    requestObject             | codigo | condicion
    ${() => requestGenerator} | ${200} | ${'con un jwt'}
    ${() => request}          | ${401} | ${'sin un jwt'}
`(`GET /facturas $condicion`, ({ requestObject, codigo, condicion }) => {
    test(`debería responder con ${codigo}`, async () => {
        const response = await requestObject().get('/facturas');
        expect(response.statusCode).toBe(codigo);
    });
});
