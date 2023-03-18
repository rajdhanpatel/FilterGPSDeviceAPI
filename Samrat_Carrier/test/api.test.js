const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../router/route');

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /samrat-carrier/filter-data', () => {
    it('should return an array of objects with key1 and key3', done => {
      chai.request(app)
        .get('/samrat-carrier/filter-data')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('lattitude');
          expect(res.body[0]).to.have.property('longitude');
          done();
        });
    });
  });
  