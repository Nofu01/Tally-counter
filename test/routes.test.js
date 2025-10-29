/**
 * @fileoverview Integration tests for API routes
 */

const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/main');
const counter = require('../src/counter');

describe('API Routes', () => {
  
  beforeEach(() => {
    // Reset counter before each test
    counter.reset();
  });

  describe('GET /', () => {
    it('should return API information', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('version');
          expect(res.body).to.have.property('endpoints');
          done();
        });
    });
  });

  describe('GET /counter-read', () => {
    it('should return current counter value', (done) => {
      request(app)
        .get('/counter-read')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('count');
          expect(res.body.count).to.equal(0);
          done();
        });
    });

    it('should return updated counter value', (done) => {
      counter.increase();
      counter.increase();
      
      request(app)
        .get('/counter-read')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.count).to.equal(2);
          done();
        });
    });
  });

  describe('GET /counter-increase', () => {
    it('should increase counter and return new value', (done) => {
      request(app)
        .get('/counter-increase')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('count');
          expect(res.body.count).to.equal(1);
          done();
        });
    });

    it('should increase counter multiple times', (done) => {
      request(app)
        .get('/counter-increase')
        .end(() => {
          request(app)
            .get('/counter-increase')
            .end(() => {
              request(app)
                .get('/counter-increase')
                .expect(200)
                .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body.count).to.equal(3);
                  done();
                });
            });
        });
    });
  });

  describe('GET /counter-reset', () => {
    it('should reset counter to 0', (done) => {
      counter.increase();
      counter.increase();
      
      request(app)
        .get('/counter-reset')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('count');
          expect(res.body.count).to.equal(0);
          done();
        });
    });

    it('should work when counter is already 0', (done) => {
      request(app)
        .get('/counter-reset')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.count).to.equal(0);
          done();
        });
    });
  });

  describe('Integration Tests', () => {
    it('should handle full workflow: increase -> read -> reset', (done) => {
      request(app)
        .get('/counter-increase')
        .end(() => {
          request(app)
            .get('/counter-read')
            .end((err, res) => {
              expect(res.body.count).to.equal(1);
              
              request(app)
                .get('/counter-reset')
                .end((err, res) => {
                  expect(res.body.count).to.equal(0);
                  done();
                });
            });
        });
    });

    it('should maintain state across multiple requests', (done) => {
      const increaseCount = 5;
      let completed = 0;

      for (let i = 0; i < increaseCount; i++) {
        request(app)
          .get('/counter-increase')
          .end(() => {
            completed++;
            if (completed === increaseCount) {
              request(app)
                .get('/counter-read')
                .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body.count).to.equal(increaseCount);
                  done();
                });
            }
          });
      }
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', (done) => {
      request(app)
        .get('/unknown-route')
        .expect(404)
        .end(done);
    });
  });
});