import { SET_RECIPES } from '../action/recipeAction.jsx';
import { RECIPE_FETCH } from '../action/RecipeFetch.jsx'
import { RECIPE_UPDATED } from '../action/updateRecipe.jsx'
import { RECIPE_DELETED } from '../action/deleteRecipeAction.jsx';
import { RECIPE_SAVE } from '../action/saveRecipes.jsx'
import { ALL_RECIPES } from '../action/allRecipeAction.js'

export default function recipes(state = [], action = {}) {
    switch(action.type) { 

        //case ALL_RECIPES: return action.recipes;        

        case RECIPE_DELETED:
            return state.filter(item => item.id !== action.recipeId);
            
        case RECIPE_UPDATED:
          return state.map(item => {
              //console.log(item)
              if(item.id === action.recipe.id) return action.recipe;
              return item;
          })

        case RECIPE_FETCH: 
        const index = state.findIndex(item => item.id === action.recipe.id);
        if(index > -1){
            return state.map(item => {
                if(item.id === action.recipe.id) return action.recipe;
                return item;
            });
        }else{
            return [
                ...state,
                action.recipe
            ];
        }
        case RECIPE_SAVE: return action.recipes;
        
        case SET_RECIPES: return action.recipes;
        default: return state; 
    }
}