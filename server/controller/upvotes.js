import db from '../models';

const recipe = db.Recipes;
const vote = db.votes;

/**
   * upvoteRecipe
   * @desc upvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const upvoteRecipe = (req, res) => {
  vote.findOrCreate({
    where: {
      userId: req.decoded.userId,
      recipeId: req.params.recipeID
    },
    defaults: { vote: true }
  }).then((userVote) => {
    res.status(201).send({
      Message: `${req.decoded.username} upvoted this recipe`,
      userVote
    });
  }).catch(error => {
    console.log(error.message)
    res.status(500).send({message: error.message})
  });
  vote.count({
    where: {
      recipeId: req.params.recipeID,
      vote: true
    }
  }).then((total) => {
    if (total) {
      recipe.findOne({
        where: {
          recipeId: req.params.recipeID
        },
      }).then((recipeFound) => {
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

const mostRecipeUpvote = (req, res) => {
  if (req.query.sort === 'upvotes' && req.query.order === 'des') {
    recipe.all({
      order: [['upvotes', 'DESC']]
    })
      .then(recipes => res.status(200).send(recipes))
      .catch(err => res.status(400).seznd(err));
  } else {
    res.status(404).send({
      message: 'Invalid URL...'
    });
  }
  recipe.findAndCountAll({
    include: [
      { model: vote, where: { vote: true } }
    ],
    limit: 3
  });
};

/* Export all methods */
export default {
  upvoteRecipe,
  mostRecipeUpvote
};
