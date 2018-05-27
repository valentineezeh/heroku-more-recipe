'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipe = require('../controller/recipe');

var _recipe2 = _interopRequireDefault(_recipe);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// get all user from database
router.get('/', _recipe2.default.getAllRecipes);

// get single user from database
router.get('/:id', _recipe2.default.getSingleRecipe);

// Add recipe to database
router.post('/', _auth2.default.verifyToken, _recipe2.default.addRecipe);

// remove recipe from the database
router.delete('/:id', _recipe2.default.deleteRecipe);

// update recipe route
router.put('/:id', _auth2.default.verifyToken, _recipe2.default.updateRecipe);

// Add a review to a recipe
router.post('/:id/reviews', _auth2.default.verifyToken, _recipe2.default.reviewRecipe);

// Upvote up a recipe
router.post('/:id/upvotes', _auth2.default.verifyToken, _recipe2.default.addUpvote);

// Downvote up a recipe
router.post('/:id/downvotes', _auth2.default.verifyToken, _recipe2.default.addDownvote);

exports.default = router;