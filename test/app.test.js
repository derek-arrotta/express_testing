const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

/*
describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});
*/

describe('GET /quotient', () => {
  
  it('8/4 should be 2', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 8, b: 4 })
      .expect(200, '8 divided by 4 is 2');
  });

  it(`should return 400 if 'a' is missing`, () => {
    return supertest(app)
      .get('/quotient')
      .query({ b: 4 })
      .expect(400, 'Value for a is needed');
   });

   it(`should return 400 if 'b' is missing`, () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 4 })
      .expect(400, 'Value for b is needed');
   });

   it(`should return 400 if value for 'a' or 'b' isn't numeric`, () => {
    return supertest(app)
           .get('/quotient')
           .query({ a: 'string', b: 'string' })
           .expect(400, 'Value for a must be numeric');
   });

   it(`should return 400 if 'b' is zero`, () => {
    return supertest(app)
           .get('/quotient')
           .query({ a: 4, b: 0 })
           .expect(400, 'Cannot divide by 0');
   });

});