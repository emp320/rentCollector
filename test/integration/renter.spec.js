/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');
// const Apartment = require('../../dst/models/apartment');
// const Renter = require('../../dst/models/renter');

describe('Renter', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });

  describe('post /apartments', () => {
    it('should create an apartment', (done) => {
      request(app)
      .post('/apartments')
      .send({ name: 'a1', sqft: 1240,
              bedrooms: 1, floor: 1, rent: 2500 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment.__v).to.not.be.null;
        expect(rsp.body.apartment._id).to.not.be.null;
        expect(rsp.body.apartment.name).to.equal('a1');
        done();
      });
    });
  });

  describe('post /apartments', () => {
    it('should not create an apartment - data invalid', (done) => {
      request(app)
      .post('/apartments')
      .send({ name: '', sqft: 1240,
              bedrooms: 1, floor: 1, rent: 2500 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        done();
      });
    });
  });

  describe('post /renters', () => {
    it('should create a renter', (done) => {
      request(app)
      .post('/renters')
      .send({ name: 'moe', money: 12000 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter.__v).to.not.be.null;
        expect(rsp.body.renter._id).to.not.be.null;
        expect(rsp.body.renter.name).to.equal('moe');
        expect(rsp.body.renter.money).to.equal(12000);
        done();
      });
    });
  });

  describe('post /renters', () => {
    it('should not create a renter - data invalid', (done) => {
      request(app)
      .post('/renters')
      .send({ name: '' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        done();
      });
    });
  });

  describe('get /renters', () => {
    it('should get all renters', (done) => {
      request(app)
      .get('/renters')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renters).to.not.be.null;
        done();
      });
    });
  });

  describe('get /apartments', () => {
    it('should get all apartments', (done) => {
      request(app)
      .get('/aparments')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment).to.not.be.null;
        done();
      });
    });
  });

  describe('get /apartments/:id', () => {
    it('should get one apartment', (done) => {
      request(app)
      .get('/apartments/012345678901234567891012')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment._id).to.equal('012345678901234567891012');
        done();
      });
    });
  });

  describe('get /apartments/:id', () => {
    it('should not get one apartment - bad id ', (done) => {
      request(app)
      .get('/apartments/0123456789012')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        done();
      });
    });
  });

  describe('get /renters/:id', () => {
    it('should get one renter', (done) => {
      request(app)
      .get('/renters/012345678901234567890011')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter._id).to.equal('012345678901234567890011');
        done();
      });
    });
  });

  describe('get /renters/:id', () => {
    it('should not get one renter - bad id', (done) => {
      request(app)
      .get('/renters/0123456011')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        done();
      });
    });
  });

  describe('delete /apartments/:id', () => {
    it('should delete one apartment', (done) => {
      request(app)
      .delete('/apartments/012345678901234567891014')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.id).to.equal('012345678901234567891014');
        done();
      });
    });
  });

  describe('delete /renters/:id', () => {
    it('should delete one renter', (done) => {
      request(app)
      .delete('/renters/012345678901234567890011')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.id).to.equal('012345678901234567890011');
        done();
      });
    });
  });

  describe('update /apartments/:id', () => {
    it('should update one apartment', (done) => {
      request(app)
      .put('/apartments/012345678901234567891014')
      .send({ name: 'New Heaven', sqft: 1240,
              bedrooms: 1, floor: 1, rent: 2500 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment.name).to.equal('New Heaven');
        done();
      });
    });
  });

  describe('update /renters/:id', () => {
    it('should update one renter', (done) => {
      request(app)
      .put('/renters/012345678901234567890011')
      .send({ name: 'moe', money: 15000 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter.money).to.equal(15000);
        done();
      });
    });
  });

  describe('put /apartments/:id/lease - create a new apartments & lease it!', () => {
    it('should lease an apartment', (done) => {
      request(app)
      .put('/apartments/012345678901234567891012/lease')
      .send({ renterId: '012345678901234567890011' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.status).to.equal('SUCCESS: APT LEASED!');
        done();
      });
    });
  });

  describe('put /renters/:id/pay - pay rent!', () => {
    it('should pay rent', (done) => {
      request(app)
      .put('/renters/012345678901234567890011/pay')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.status).to.equal('SUCCESS: RENT PAID!');
        done();
      });
    });
  });

});
