'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dotenv.config();


var User = _models2.default.User;
var Favorites = _models2.default.Favorites;
var error = {};

var secret = 'thelordismyhelperishallnotwant';

/**
   * signUp
   * @desc Registers a user to the application
   * Route: POST: '/users/signup'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var signUp = function signUp(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      Message: 'Password Mismatch!'
    });
  }
  User.create({
    fullName: req.body.fullname,
    email: req.body.email,
    sex: req.body.sex,
    userName: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  }).then(function (user) {
    return res.status(201).json({
      user: user
    });
  }).catch(function (error) {
    res.status(400).json(error.message); // {error, data: req.body}
  });
};

/**
   * signIn
   * @desc Login a user to the application
   * Route: POST: '/users/signin'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var signIn = function signIn(req, res) {
  if (!req.body.email || req.body.email.trim().length === 0) {
    return res.status(400).json({
      Message: 'Email Field should not be Empty'
    });
  } else if (!req.body.password) {
    return res.status(400).json({
      Message: 'Password Field should not be Empty'
    });
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    if (!user) {
      return res.status(404).send({ message: 'Invalid Username or password' });
    }
    _bcrypt2.default.compare(req.body.password, user.password, function (err, response) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      var token = _jsonwebtoken2.default.sign({
        username: user.userName,
        userId: user.id
      }, secret, { expiresIn: '24h' });
      return res.status(200).send({
        message: 'Welcome ' + user.userName,
        token: token
      });
    });
  }).catch(function (error) {
    return res.status(500).send({ error: 'an error occurred: ' + error.message });
  });
};

/**
   * addFavorites
   * @desc adds a recipe to users favorites
   * Route: POST: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var addFavorites = function addFavorites(req, res) {
  Favorites.findOrCreate({
    where: {
      userId: req.decoded.userId,
      recipeId: req.params.recipeID
    },
    defaults: { category: req.body.category }
  }).spread(function (favorite) {
    res.status(201).send({
      favorite: favorite
    });
  }).catch(function (err) {
    return res.status(400).send({});
  });
};

/**
   * retrieveFavorites
   * @desc gets all favorites added by a user
   * Route: GET: '/users/:userID/recipes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var retrieveFavorites = function retrieveFavorites(req, res) {
  Favorites.findOne({
    where: {
      userId: req.params.userID
    }
  }).then(function (recipe) {
    if (recipe) {
      res.status(200).send({
        favoriteRecipe: recipe
      });
    } else {
      res.status(404).send({
        message: 'Record not Found!'
      });
    }
  }).catch(function () {
    return res.status(400).send({
      message: 'User not Found'
    });
  });
};

exports.default = {
  signUp: signUp,
  signIn: signIn,
  addFavorites: addFavorites,
  retrieveFavorites: retrieveFavorites
};