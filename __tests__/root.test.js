const app = require('../app');
const request = require('supertest')(app);

test('GET / debería responder "Hola mundo"', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('Hola mundo');
});