const request = require('supertest');
const createApp = require('../src/app');

describe('Calculator API', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /health', () => {
    test('returns 200 with status ok', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('POST /add', () => {
    test('adds two integers and returns sum', async () => {
      const response = await request(app)
        .post('/add')
        .send({ a: 3, b: 7 })
        .expect(200);

      expect(response.body).toEqual({ result: 10 });
    });

    test('adds two floats and returns sum', async () => {
      const response = await request(app)
        .post('/add')
        .send({ a: 1.5, b: 2.5 })
        .expect(200);

      expect(response.body).toEqual({ result: 4 });
    });

    test('adds negative numbers', async () => {
      const response = await request(app)
        .post('/add')
        .send({ a: -5, b: 3 })
        .expect(200);

      expect(response.body).toEqual({ result: -2 });
    });

    test('returns 400 when a is missing', async () => {
      const response = await request(app)
        .post('/add')
        .send({ b: 7 })
        .expect(400);

      expect(response.body).toEqual({ error: 'Both \'a\' and \'b\' must be valid numbers' });
    });

    test('returns 400 when b is missing', async () => {
      const response = await request(app)
        .post('/add')
        .send({ a: 3 })
        .expect(400);

      expect(response.body).toEqual({ error: 'Both \'a\' and \'b\' must be valid numbers' });
    });

    test('returns 400 when a is not a number', async () => {
      const response = await request(app)
        .post('/add')
        .send({ a: 'three', b: 7 })
        .expect(400);

      expect(response.body).toEqual({ error: 'Both \'a\' and \'b\' must be valid numbers' });
    });

    test('returns 400 when b is not a number', async () => {
      const response = await request(app)
        .post('/add')
        .send({ a: 3, b: 'seven' })
        .expect(400);

      expect(response.body).toEqual({ error: 'Both \'a\' and \'b\' must be valid numbers' });
    });

    test('returns 400 when body is empty', async () => {
      const response = await request(app)
        .post('/add')
        .send({})
        .expect(400);

      expect(response.body).toEqual({ error: 'Both \'a\' and \'b\' must be valid numbers' });
    });
  });

  describe('Unknown routes', () => {
    test('returns 404 for unknown path', async () => {
      const response = await request(app)
        .get('/unknown')
        .expect(404);

      expect(response.body).toEqual({ error: 'Not found' });
    });

    test('returns 404 for unknown POST path', async () => {
      const response = await request(app)
        .post('/unknown')
        .send({ a: 1, b: 2 })
        .expect(404);

      expect(response.body).toEqual({ error: 'Not found' });
    });
  });
});
