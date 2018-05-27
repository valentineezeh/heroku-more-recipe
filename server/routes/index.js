import express from 'express';
import path from 'path';
import recipeController from '../controller/recipe';
import upvotesController from '../controller/upvotes';
import reviewController from '../controller/reviews';
import userController from '../controller/user';
import { Auth, RecipeValidation, signUpValidation,  } from '../middleware';


const router = express.Router();



/* GET home page. */
router.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'))
// res.status(200).json({ message: 'More-Recipes' });
});

/* All API Routes */

// Register a new User
router.post('/api/v1/users/signup',   userController.signUp);

// Login route
router.post('/api/v1/users/signin', userController.signIn);

// Get Favorite recipes
router.get('/api/v1/users/:userID/recipes', Auth.verify, userController.retrieveFavorites);

// Retrieve all recipes
router.get('/api/v1/recipes', recipeController.retrieveRecipes);

// Retrieve single User Recipes
router.get('/api/v1/user/recipes', Auth.verify, recipeController.getUserRecipes);

// Retrieve single recipe
router.get('/api/v1/recipes/:recipeId',  recipeController.retrieveRecipe);

// Add a recipe
router.post('/api/v1/recipes', Auth.verify, recipeController.createRecipe);

// Add Favorite recipes
router.post('/api/v1/recipes/:recipeId', Auth.verify, userController.addFavorites);

// Delete a recipe
router.delete('/api/v1/recipes/:id', Auth.verify, recipeController.deleteRecipe);

// Update a recipe
router.put('/api/v1/recipes/:id', Auth.verify,  recipeController.updateRecipe);

// Post a review
router.post('/api/v1/recipes/:recipeID/reviews', Auth.verify, reviewController.reviewRecipe);

// Upvote a recipe
router.post('/api/v1/recipes/:recipeID/upvote', Auth.verify, upvotesController.upvoteRecipe);

// Get Recipe by Most Upvotes
router.get('/api/v1/recipe', upvotesController.mostRecipeUpvote);

// To Get all Users
router.get('/api/v1/users/', Auth.verify, userController.getAllUsers);


// A catch-all routes not define.
router.get('*', (req, res) => res.status(404).json({
  errors: {global: 'Something went wrong. We are working on it.'}
}));

router.delete('*', (req, res) => res.status(404).json({
  errors: {global: 'Something went wrong. We are working on it.'}
}));

router.post('*', (req, res) => res.status(404).json({
  errors: {global: 'Something went wrong. We are working on it.'}
  
}));

router.put('*', (req, res) => res.status(404).json({
  errors: {global: 'Something went wrong. We are working on it.'}
}));

export default router;
