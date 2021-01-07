const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /frequency endpoint', () => {

  it('s should exist', () => {
    return supertest(app)
      .get('/frequency')
      .query()
      .expect(400, 'Invalid request');
  })

  it('If more than one characters tie for highest frequency return the one closest to the beginning of the alphabet.', () => {
    
    const query = { s: 'aabbAABB' };
    const expected =  {
      unique: 2,
      average: 4,
      highest: 'a',
      'a': 4,
      'b': 4,
    };

    return supertest(app)
      .get('/frequency')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.eql(expected);
        expect(res.body.length).to.equal(expected.length);
      });
  })

});