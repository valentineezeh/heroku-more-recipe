'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Faker = require('Faker');

var _Faker2 = _interopRequireDefault(_Faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeData = {

  userOne: {
    fullname: 'Valentine',
    email: 'val@yahoo.com',
    sex: 'male',
    username: 'val',
    password: 'val',
    confirmPassword: 'val'
  },

  userTwo: {
    fullname: _Faker2.default.Name.findName(),
    email: 'user@yahoo.com',
    sex: 'male',
    username: 'user',
    password: 'user',
    confirmPassword: 'user'
  },

  recipe: {
    title: 'Beans',
    description: 'This is how to prepare beans'
  },

  recipe2: {
    title: 'Egusi',
    description: 'This is how to prepare Egusi soup'
  },

  review: {
    fullname: _Faker2.default.Name.findName(),
    title: 'Egusi',
    review: 'Cool Stuff!!'
  }
};

exports.default = fakeData;