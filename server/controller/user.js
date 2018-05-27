import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import db from '../models/';


dotenv.config();


const User = db.User;
const Favorites = db.Favorites;
const Recipes = db.Recipe;
const Reviews = db.Reviews;
// const error = {};

const secret = process.env.SECRET

/**
   * signUp
   * @desc Registers a user to the application
   * Route: POST: '/users/signup'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const signUp = (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      errors: { form: "Mismatch Password! Please Try Again.."}
    });
  }
  if(!validator.isEmail(req.body.email)){
    return res.status(400).json({
      errors: { form: "Invalid Email" }
    })
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
   // console.log(user)
    if(user){
      res.status(400).json({
        errors: { form: "Email Already Exist"}
      })
    }  
   else{
      User
    .create({
      fullName: req.body.fullName,
      email: req.body.email,
      sex: req.body.sex,
      userName: req.body.userName,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    })
    .then(user => res.status(201).json({
      user
    }))
    .catch((error) => {
      console.log(error)
      res.status(500).json(error.message); // {error, data: req.body}
    });
    }
  }).catch((error)=> {
    console.log(error.message)
    res.status(404).json(error.message)
  })
  
};

/**
   * signIn
   * @desc Login a user to the application
   * Route: POST: '/users/signin'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const signIn = (req, res) => {
  const { identifier, password } = req.body;
  User.findOne({
    where: {
      email: identifier,
    },
  })
    .then((user) => {
     if (user) {
      if (bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({
          id: user.id,
          userName: user.userName,
        }, secret);
        res.json({ token });
      }else {
        res.status(401).json({
          errors: { form: "Incorrect Password"}
        })
      }
     }else{
       res.status(401).json({
         errors: { form: "User does not exist. Please Type in the Correct Email address"}
       })
     }
      
    })
    .catch(error => res.status(500).send({ error: `an error occurred: ${error.message}` }));
};

/**
   * addFavorites
   * @desc adds a recipe to users favorites
   * Route: POST: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const getAllUsers = (req, res) => User.findAll({
  include: [
    {
      model: Recipes,
      as: 'recipesId',
      include: [
        {
          model: Reviews,
          as: 'reviews',
        },
        {
          model: Favorites,
          as: 'favorites',
        }
      ]
    }
  ]
}).then((users) => {
  const resObj = users.map(user => Object.assign(
    {},
    {
      userId: user.id,
      username: user.username,
      recipes: user.Recipes.map(recipe => Object.assign(
        {},
        {
          recipeId: recipe.id,
          userId: recipe.userId,
          recipeTitle: recipe.Title,
          recipeDes: recipe.description,
          reviews: recipe.Reviews.map(review => Object.assign(
            {},
            {
              reviewId: review.id,
              userId: review.userId,
              recipeId: review.recipeId,
              reviewTitle: review.title,
              reviewReview: review.review,
            },

          )),
          favorites: recipe.Favorites.map(favorite => Object.assign(
            {},
            {
              favoriteId: favorite.id,
              userId: favorite.userId,
              favoriteCat: favorite.cartegory
            }
          ))
        }
      ))
    }
  ));
  return res.status(200).send({ resObj });
}).catch((error) => {
  return console.log(error);
  res.status(404).send(error);
});


const addFavorites = (req, res) => {
  Favorites
    .findOrCreate({
      where: {
        userId: req.decoded.userId,
        recipeId: req.params.recipeID
      },
      defaults: { category: req.body.category }
    })
    .spread((favorite) => {
      res.status(201).send({
        favorite
      });
    })
    .catch(err => res.status(400).send({
    }));
};

/**
   * retrieveFavorites
   * @desc gets all favorites added by a user
   * Route: GET: '/users/:userID/recipes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const retrieveFavorites = (req, res) => {
  Favorites
    .findOne({
      where: {
        userId: req.params.userID
      }
    })
    .then((recipe) => {
      if (recipe) {
        res.status(200).send({
          favoriteRecipe: recipe
        });
      } else {
        res.status(404).send({
          message: 'Record not Found!'
        });
      }
    })
    .catch(() => res.status(400).send({
      message: 'User not Found'
    }));
};


export default {
  signUp,
  signIn,
  addFavorites,
  retrieveFavorites,
  getAllUsers,
};
