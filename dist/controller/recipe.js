'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipeListings = _models2.default.Recipes;

/**
   * reviewRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var retrieveRecipes = function retrieveRecipes(req, res) {
  return recipeListings.all().then(function (recipes) {
    return res.status(200).send(recipes);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

/**
   * createRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var createRecipe = function createRecipe(req, res) {
  if (!req.body.title || req.body.title.trim().length === 0) {
    return res.status(400).json({
      Message: 'Title Field should not be Empty'
    });
  } else if (!req.body.description || req.body.description.trim().length === 0) {
    return res.status(400).json({
      Message: 'Description Field should not be Empty'
    });
  }
  recipeListings.create({
    userId: req.decoded.userId,
    title: req.body.title,
    description: req.body.description
  }).then(function (recipe) {
    return res.status(201).json({ recipe: recipe });
  }).catch(function (err) {
    return res.status(400).send(err.message);
  });
};

/**
   * deleteRecipe
   * @desc deletes a recipe from catalog
   * Route: DELETE: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var deleteRecipe = function deleteRecipe(req, res) {
  return recipeListings.findById(req.params.recipeID).then(function (recipe) {
    recipe.destroy().then(res.status(200).send({
      message: 'Recipe successfully deleted!'
    })).catch(function (err) {
      return res.status(400).send(err);
    });
  }).catch(function () {
    return res.status(404).send({
      message: 'Record Not Found!'
    });
  });
};

/**
   * updateRecipe
   * @desc modifies a recipe in the catalog
   * Route: PUT: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var updateRecipe = function updateRecipe(req, res) {
  var updateRecord = {};
  console.log(req.decoded.userId);
  console.log(req.params.recipeID);
  recipeListings.findOne({
    where: {
      id: req.params.recipeID,
      userId: req.decoded.userId
    }
  }).then(function (recipe) {
    if (req.body.title) {
      updateRecord.title = req.body.title;
    } else if (req.body.description) {
      updateRecord.description = req.body.description;
    }
    recipe.update(updateRecord).then(function (updatedRecipe) {
      return res.send({
        updatedRecipe: updatedRecipe
      });
    });
  }).catch(function (e) {
    return res.status(401).send({
      message: 'You do not have permission to modify this Recipe'
    });
  });
};

/**
   * retrieveRecipe
   * @desc gets a single recipe in the catalog
   * Route: GET: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

var retrieveRecipe = function retrieveRecipe(req, res) {
  recipeListings.findById(req.params.recipeID).then(function (recipe) {
    if (recipe) {
      res.status(200).send({
        recipe: recipe
      });
    } else {
      res.status(404).send({
        message: 'Record not Found!'
      });
    }
  }).catch(function () {
    return res.status(400).send({
      message: 'Recipe not Found'
    });
  });
};

/* Export all methods */
exports.default = {
  retrieveRecipes: retrieveRecipes,
  createRecipe: createRecipe,
  deleteRecipe: deleteRecipe,
  updateRecipe: updateRecipe,
  retrieveRecipe: retrieveRecipe
};