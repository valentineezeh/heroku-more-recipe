import axios from 'axios';

export const RECIPE_FETCH = "RECIPE_FETCH"

export function RecipeFetch(recipe){
    console.log(recipe)
    return {
        type: RECIPE_FETCH,
        recipe
    }
}

export function fetchRecipe(recipeId){
    //console.log(recipeId)
    return dispatch => {
        return (dispatch) => {
            return axios.get(`http://localhost:8009/api/v1/recipes/${recipeId}`)
              .then( response => {
                  console.log(response)
                  dispatch( RecipeFetch(response.data));
              }).catch( error =>{
                  throw(error)
              })
        }
    }
}

// fetch(`http://localhost:8009/api/v1/recipes/${recipeId}`) 
//         .then(res =>res.json())
//         .then(data => dispatch(RecipeFetch(data.recipe)));