import axios from 'axios'

export const SET_RECIPES = 'SET_RECIPES';

export function setRecipes(recipes){
    //console.log(recipes)
    return {
        type: SET_RECIPES,
        recipes
    }
}
export function fetchRecipes(){
    return dispatch => {
        return axios.get("http://localhost:8009/api/v1/user/recipes/")
            .then( response => {
                //console.log(response)
                dispatch(setRecipes( response.data))
            }).catch(error => {
                throw(error)
            })
    }
}

// fetch("http://localhost:8009/api/v1/recipes/") 
//         .then(results =>results.json())
//         .then(data => dispatch(setRecipes(data.recipes)));