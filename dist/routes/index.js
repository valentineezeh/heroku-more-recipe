'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipe = require('../controller/recipe');

var _recipe2 = _interopRequireDefault(_recipe);

var _upvotes = require('../controller/upvotes');

var _upvotes2 = _interopRequireDefault(_upvotes);

var _reviews = require('../controller/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.status(200).json({ message: 'More-Recipes' });
});

/* All API Routes */

// Register a new User
router.post('/users/signup', _user2.default.signUp);

// Login route
router.post('/users/signin', _user2.default.signIn);

// Get Favorite recipes
router.get('/users/:userID/recipes', _auth2.default.verify, _user2.default.retrieveFavorites);

// Retrieve all recipes
router.get('/recipes', _recipe2.default.retrieveRecipes);

// Retrieve single recipe
router.get('/recipes/:recipeID', _auth2.default.verify, _recipe2.default.retrieveRecipe);

// Add a recipe
router.post('/recipes', _auth2.default.verify, _recipe2.default.createRecipe);

// Add Favorite recipes
router.post('/recipes/:recipeID', _auth2.default.verify, _user2.default.addFavorites);

// Delete a recipe
router.delete('/recipes/:recipeID', _auth2.default.verify, _recipe2.default.deleteRecipe);

// Update a recipe
router.put('/recipes/:recipeID', _auth2.default.verify, _recipe2.default.updateRecipe);

// Post a review
router.post('/recipes/:recipeID/reviews', _auth2.default.verify, _reviews2.default.reviewRecipe);

// Upvote a recipe
router.post('/recipes/:recipeID/upvote', _auth2.default.verify, _upvotes2.default.upvoteRecipe);

// Get Recipe by Most Upvotes
router.get('/recipe', _upvotes2.default.mostRecipeUpvote);

// A catch-all routes not define.
router.get('*', function (req, res) {
  return res.status(404).json({
    Message: 'Invalid Route'
  });
});

router.delete('*', function (req, res) {
  return res.status(404).json({
    Message: 'Invalid Route'
  });
});

router.post('*', function (req, res) {
  return res.status(404).json({
    Message: 'Invalid Route'
  });
});

router.put('*', function (req, res) {
  return res.status(404).json({
    Message: 'Invalid Route'
  });
});

exports.default = router;