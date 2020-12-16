const app = require('../app');
const request = require('supertest')(app);
const { getToken, requestWrapper } = require('../utils/testUtils');

let requestGenerator;

process.env.DB_NAME = 'facturas';

beforeAll(async () => {
    const token = await getToken(request);
    requestGenerator = requestWrapper(request, token);
});

test('GET /facturas debería responder con 200', async () => {
    const response = await requestGenerator.get('/facturas');
    expect(response.statusCode).toBe(200);
});