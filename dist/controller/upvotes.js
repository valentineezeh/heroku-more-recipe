'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipe = _models2.default.Recipes;
var vote = _models2.default.votes;

/**
   * upvoteRecipe
   * @desc upvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var upvoteRecipe = function upvoteRecipe(req, res) {
  vote.findOrCreate({
    where: {
      userId: req.decoded.userId,
      recipeId: req.params.recipeID
    },
    defaults: { vote: true }
  }).spread(function (userVote) {
    res.status(201).send({
      Message: req.decoded.username + ' upvoted this recipe',
      userVote: userVote
    });
  }).catch(function (err) {
    return res.status(400).send({
      message: err.parent.detail
    });
  });
  vote.count({
    where: {
      recipeId: req.params.recipeID,
      vote: true
    }
  }).then(function (total) {
    if (total) {
      recipe.findOne({
        where: {
          recipeId: req.params.recipeID
        }
      }).then(function (recipeFound) {
        recipeFound.updateAttributes({
          upvotes: total
        });
      });
    }
  });
};

/**
   * mostRecipeUpvote
   * @desc Gets recipe with Upvotes in descending order
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var mostRecipeUpvote = function mostRecipeUpvote(req, res) {
  if (req.query.sort === 'upvotes' && req.query.order === 'des') {
    recipe.all({
      order: [['upvotes', 'DESC']]
    }).then(function (recipes) {
      return res.status(200).send(recipes);
    }).catch(function (err) {
      return res.status(400).seznd(err);
    });
  } else {
    res.status(404).send({
      message: 'Invalid URL...'
    });
  }
  recipe.findAndCountAll({
    include: [{ model: vote, where: { vote: true } }],
    limit: 3
  });
};

/* Export all methods */
exports.default = {
  upvoteRecipe: upvoteRecipe,
  mostRecipeUpvote: mostRecipeUpvote
};