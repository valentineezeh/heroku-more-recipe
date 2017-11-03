import db from '../models';

const recipeListings = db.Recipes;

/**
   * reviewRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const retrieveRecipes = (req, res) => recipeListings
  .all()
  .then(recipes => res.status(200).send(recipes))
  .catch(err => res.status(400).send(err));

/**
   * createRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const createRecipe = (req, res) => {
  if (!req.body.title || req.body.title.trim().length === 0) {
    return res.status(400).json({
      Message: 'Title Field should not be Empty',
    });
  } else if (!req.body.description || req.body.description.trim().length === 0) {
    return res.status(400).json({
      Message: 'Description Field should not be Empty',
    });
  }
  recipeListings.create({
    userId: req.decoded.userId,
    title: req.body.title,
    description: req.body.description
  }).then(recipe => res.status(201).json({ recipe }))
    .catch(err => res.status(400).send(err.message));
};

/**
   * deleteRecipe
   * @desc deletes a recipe from catalog
   * Route: DELETE: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const deleteRecipe = (req, res) => recipeListings
  .findById(req.params.recipeID)
  .then((recipe) => {
    recipe
      .destroy()
      .then(res.status(200).send({
        message: 'Recipe successfully deleted!'
      }))
      .catch(err => res.status(400).send(err));
  })
  .catch(() => res.status(404).send({
    message: 'Record Not Found!'
  }));

/**
   * updateRecipe
   * @desc modifies a recipe in the catalog
   * Route: PUT: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const updateRecipe = (req, res) => {
  const updateRecord = {};
  console.log(req.decoded.userId);
  console.log(req.params.recipeID);
  recipeListings.findOne({
    where: {
      id: req.params.recipeID,
      userId: req.decoded.userId,
    }
  }).then((recipe) => {
    if (req.body.title) {
      updateRecord.title = req.body.title;
    } else if (req.body.description) {
      updateRecord.description = req.body.description;
    }
    recipe.update(updateRecord)
      .then(updatedRecipe => res.send({
        updatedRecipe
      }));
  })
    .catch((e) => res.status(401).send({
      message: 'You do not have permission to modify this Recipe'
    }));
};

/**
   * retrieveRecipe
   * @desc gets a single recipe in the catalog
   * Route: GET: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const retrieveRecipe = (req, res) => {
  recipeListings
    .findById(req.params.recipeID)
    .then((recipe) => {
      if (recipe) {
        res.status(200).send({
          recipe
        });
      } else {
        res.status(404).send({
          message: 'Record not Found!'
        });
      }
    })
    .catch(() => res.status(400).send({
      message: 'Recipe not Found'
    }));
};

/* Export all methods */
export default {
  retrieveRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  retrieveRecipe
};