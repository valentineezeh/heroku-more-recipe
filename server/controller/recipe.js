import db from '../models';

const recipeListings = db.Recipes;
const Favorites = db.Favorites;
const Reviews = db.Reviews;
const Votes = db.votes;

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
  .then(recipes => res.status(200).send({
    recipes: recipes
  }))
  .catch((error) => {
    return console.log(error);
    res.status(400).json(error);
  });

const getUserRecipes = (req, res) => {
  recipeListings.findAll({
    where: {
      userId: req.decoded.id
    }
  }).then( recipes => {
    res.status(200).send(recipes)
  }).catch( error => {
    res.status(400).send( error.message )
  })
}

/**
   * createRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const createRecipe = (req, res) => {
  if (req.body.title == ''){
    return res.status(400).json({
      errors: { form: "Title Field should not be empty."}
    })
  }
  if (req.body.description == ''){
    return res.status(400).json({
      errors: { form: "description Field should not be empty."}
    })
  }
  if (req.body.imageUrl == ''){
    return res.status(400).json({
      errors: { form: "Image Field should not be empty."}
    })
  }
  recipeListings.create({
    userId: req.decoded.id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }).then(recipe => res.status(201).send({ recipe }))
    .catch(error => {
      console.log(error.message)
      res.status(400).send(error.message)});
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
  .findOne({
    where: {
      userId: req.decoded.id,
      id: req.params.id
  }
  })
  .then((recipe) => {
    if(req.decoded.id != recipe.userId){
      return res.status(400).send({
          error: { form: 'You do not have the privilege to delete this Recipe'},
      });
  }
    recipe
      .destroy()
      .then(res.status(200).send({
        message: 'Recipe successfully deleted!'
      }))
      .catch(error => res.status(400).send(error.message));
  })
  .catch(() => res.status(404).send({
    error: { form : 'Record Not Found!'}
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
  //const updateRecord = {};
  recipeListings.findOne({
    where: {
      id: req.params.id,
       userId: req.decoded.id,
    }
  }).then((recipe) => {
    if(!recipe){
      return res.status(404).send({
        error: { form : "Recipe does not Exist"}
      })
    }
    recipe.update({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    })
      .then(updatedRecipe => {
        //console.log(updatedRecipe)
        res.status(200).send({
        updatedRecipe
      })});
  })
    .catch(( error ) => {
      console.log(error.message)
      res.status(401).send({
      error: { form : 'You do not have permission to modify this Recipe'}
    })});
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
    .findById(req.params.recipeId, {
      include: [
        {
          model: Reviews,
          as: 'reviews',
        },
      ],
    })
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
  retrieveRecipe,
  getUserRecipes
};
