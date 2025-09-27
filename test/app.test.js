const request = require('supertest');
const app = require('../app');

describe('GET /add', () => {
  it('should return the sum of a and b', async () => {
    const res = await request(app).get('/add?a=2&b=3');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  it('should return error for invalid input', async () => {
    const res = await request(app).get('/add?a=foo&b=3');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid numbers');
  });
});
