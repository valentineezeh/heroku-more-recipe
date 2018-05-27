import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';

export function allRecipes( recipes ){
    //console.log(recipes)
    return {
        type: ALL_RECIPES,
        recipes
    }
}

export function fetchAllRecipes(){
    return dispatch => {
        return axios.get('http://localhost:8009/api/v1/recipes/')
        .then( response => {
            //console.log(response)
            dispatch(allRecipes(response.data))
        }).catch( error => {
            throw(error)
        })
    }
}