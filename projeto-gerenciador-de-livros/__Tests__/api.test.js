const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const expect = require('chai').expect;

const mongo = 'mongodb://localhost/meus-livros-api-test';
mongoose.Promise = global.Promise;

const User = require('../models/user');
const Livro = require('../models/livros');

describe('Testing RestAPI', () => {
  before('connecting to mongodb', async () => {
    await mongoose.connect(mongo, { useMongoClient: true });
    await User.remove({});
    const user = new User({
      username: 'michael',
      password: '123456',
      roles: ['restrito'],
    });
    await user.save();
    await Livro.remove({});
    return true;
  });

  it('should return error', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).be.null;
        expect(res.body.success).be.false;
        done();
      });
  });

  it('shoult auth an user', (done) => {
    request(app)
      .post('/auth')
      .send({ username: 'michael', password: '123456' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).be.true;
        expect(res.body.token).be.string;
        done();
      });
  });

  it('shoult not auth an user', (done) => {
    request(app)
      .post('/auth')
      .send({ username: 'wellington', password: '123456' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).be.false;
        expect(res.body.message).be.string;
        done();
      });
  });

  describe('auth as restrito', () => {
    let token = '';
    before('get token', (done) => {
      request(app)
        .post('/auth')
        .send({ username: 'michael', password: '123456' })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('should return no books', (done) => {
      request(app)
        .get('/')
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body).be.empty
          done();
        });
    });
    it('should create a new books', (done) => {
      request(app)
      .post('/')
      .set('x-access-token', token)
      .send({ name: 'Livro 1', author: 'James Smith', pages: 328, status: 'não lido'})
      .expect(200)
      .end((err, res) => {
        expect(res.body._id).be.string
        done()
      })
    })
  });
});
