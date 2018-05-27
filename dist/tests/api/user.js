'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _Faker = require('Faker');

var _Faker2 = _interopRequireDefault(_Faker);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _fakeData = require('../helpers/fakeData');

var _fakeData2 = _interopRequireDefault(_fakeData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// /**
//  * API Endpoint Tests
//  */
var expect = _chai2.default.expect;

var userToken = void 0,
    newUser = void 0,
    recipe1 = void 0,
    recipe2 = void 0;

describe('More-Recipes', function () {
  it('loads the home page', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/').expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});

describe('User Signin/Signup', function () {
  _models2.default.User.destroy({
    cascade: true,
    truncate: true
  });

  it('creates a new user with fullname and email', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users/signup').set('Content-Type', 'application/json').send(_fakeData2.default.userOne).expect(201).end(function (err, res) {
      if (err) return done(err);
      newUser = res.body.user;
      expect(newUser).to.have.property('fullName');
      expect(newUser).to.have.property('email');
      return done();
    });
  });

  it('raises error with duplicate user email', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users/signup').set('Content-Type', 'application/json').send(_fakeData2.default.userOne).expect(400).end(function (err, res) {
      if (err) return done(err);
      expect(res.body.errors[0].message).to.equal('email must be unique');
      done();
    });
  });

  it('raises error with duplicate username', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users/signup').set('Content-Type', 'application/json').send({
      fullname: 'Daddychuks',
      email: 'chuksy@yahoo.com',
      sex: 'male',
      username: 'chuks',
      password: 'chuks',
      confirmPassword: 'chuks'
    }).expect(400).end(function (err, res) {
      expect(res.body.errors[0].message).to.equal('userName must be unique');
      if (err) return done(err);
      done();
    });
  });

  it('denies access upon incorrect login details', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send({
      email: 'chuks@yahoo.com',
      password: 'password'
    }).expect(400).end(function (err, res) {
      expect(res.body.message).to.equal('Username or password incorrect');
      if (err) return done(err);
      done();
    });
  });

  it('ensures user cannot be created if one of email or password is lacking.', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send({
      password: 'password'
    }).expect(400).end(function (err, res) {
      expect(res.body.Message).to.equal('Email Field should not be Empty');
      if (err) return done(err);
      done();
    });
  });

  it('returns a token upon successful signin', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send({
      email: 'chuks@yahoo.com',
      password: 'chuks'
    }).expect(200).end(function (err, res) {
      userToken = res.body.token;
      expect(userToken);
      expect(res.body.message).to.equal('Welcome chuks');
      if (err) return done(err);
      done();
    });
  });

  it('fails to add recipe for viewers without token', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/recipes').send(_fakeData2.default.recipe).expect(401).end(function (err, res) {
      expect(res.body.message).to.equal('No token provided');
      if (err) return done(err);
      done();
    });
  });
});

describe('Recipe Operations', function () {
  _models2.default.Recipe.destroy({
    cascade: true,
    truncate: true
  });

  it('users require a token to add recipe', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/recipes').set('authorization', userToken).send(_fakeData2.default.recipe).expect(201).end(function (err, res) {
      recipe1 = res.body.recipe;
      if (err) return done(err);
      done();
    });
  });

  it('adds a recipe to the catalog', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/recipes').set('authorization', userToken).send(_fakeData2.default.recipe2).expect(201).end(function (err, res) {
      recipe2 = res.body.recipe;
      if (err) return done(err);
      done();
    });
  });

  it('retrieves recipes from catalog', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/recipes').expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('modifies a recipe in catalog', function (done) {
    (0, _supertest2.default)(_app2.default).put('/api/v1/recipes/' + recipe2.recipeId).set('authorization', userToken).send({
      title: 'Egusi soup preparation',
      description: 'This is how to prepare Egusi soup'
    }).expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('deletes recipe from catalog', function (done) {
    (0, _supertest2.default)(_app2.default).delete('/api/v1/recipes/' + recipe2.recipeId).set('authorization', userToken).expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
});

describe('Reviews Operations', function () {
  _models2.default.Reviews.destroy({
    cascade: true,
    truncate: true
  });

  it('adds a review to a recipe', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/recipes/' + recipe1.recipeId + '/reviews').set('authorization', userToken).send({
      userId: newUser.userId,
      recipeId: recipe1.recipeId,
      fullname: _Faker2.default.Name.findName(),
      title: 'Egusi',
      review: 'Cool Stuff!!'
    }).expect(201).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
});

describe('User Operations', function () {
  _models2.default.Favorites.destroy({
    cascade: true,
    truncate: true
  });

  it('adds a recipe to users favorites', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/recipes/' + recipe1.recipeId).set('authorization', userToken).send({
      recipeId: recipe1.recipeId,
      userId: newUser.userId,
      category: 'Soups'
    }).expect(400).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('gets all favorites added by a user', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/' + newUser.userId + '/recipes').set('authorization', userToken).expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
});