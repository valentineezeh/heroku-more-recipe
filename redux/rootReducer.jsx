import { combineReducers } from 'redux';

import recipes from '../reducers/recipes.jsx'
import flashMessages from '../reducers/flashMessages.jsx'
import auth from '../reducers/auth.jsx'
import allRecipes from "../reducers/allRecipes.js";

// console.log(allRecipes)
// console.log(recipes)

export default combineReducers({
    recipes,
    flashMessages,
    auth,
    allRecipes,
})