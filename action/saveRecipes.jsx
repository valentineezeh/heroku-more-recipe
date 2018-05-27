import axios from "axios";

export const RECIPE_SAVE = 'RECIPE_SAVE'

// function handleResponse(response){
//     if(response.ok){
//         return response.json();
//     }else{
//         let error = new Error(response.statusText);
//         error.response = response;
//         throw error;
//     }
// }

export function recipeSave (recipe) {

    return {
        type: RECIPE_SAVE,
        recipe
    }
}

export function saveRecipe(data) {
    //console.log(data)
    return dispatch => {
        return axios.post("http://localhost:8009/api/v1/recipes/", data)
        .then(() => dispatch( recipeSave(data)))
        .catch( error => { error })
        
    }
}
