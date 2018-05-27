import { ALL_RECIPES } from '../action/allRecipeAction.js'

export default function allRecipes(state = [], action = {}){
    switch(action.type) {
        case ALL_RECIPES: return action.recipes;
        default: return state;
    }
}