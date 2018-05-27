'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
	res.json({ message: "users route" });
});

router.get('/:id/profile', _user2.default.profile);

router.get('/signin', _user2.default.signup);
router.post('/signin', _user2.default.signin);

router.get('/signup', _user2.default.signup);
router.post('/signup', _user2.default.signup);

router.get('/:id/recipes', _user2.default.favourites);
router.post('/:id/recipes', _user2.default.favourites);

exports.default = router;