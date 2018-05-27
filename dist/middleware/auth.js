'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = _user2.default.secret;

// require('dotenv').config();

var Auth = {
  // function to authenticate access to users with a token
  verify: function verify(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
      _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
        if (err) {
          console.log(err);
          res.status(401).send({ message: 'You do not have Permission to this Page' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No token provided' });
    }
  }
};

exports.default = Auth;