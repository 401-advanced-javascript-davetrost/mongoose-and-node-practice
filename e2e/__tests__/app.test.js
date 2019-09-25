const request = require('../request');  // DRY formula to call supertest  

describe('basic server functionality', () => {

  it('is alive', () => {
    return request
      .get('/hello')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('Hello World');
      });
  });

  it('returns 404 for non-api paths that are unsupported', () => {
    return request
      .get('/somethingbad')
      .expect(404)
      .expect('Content-Type', /text/);
  });

  it('returns unique 404 code for bad api paths', () => {
    return request
      .get('/api/badbadbad')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toMatch(/not found/i);
      });
  });
});
