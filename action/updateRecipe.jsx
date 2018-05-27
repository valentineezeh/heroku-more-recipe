import axios from 'axios';
export const RECIPE_UPDATED = "RECIPE_UPDATED"

export function recipeUpdated (recipe) {
    //console.log(recipe)
    return {
        type: RECIPE_UPDATED,
        recipe
    }
}

// function handleResponse(response){
//     if(response.ok){
//         return response.json();
//     }else{
//         let error = new Error(response.statusText);
//         error.response = response;
//         throw error;
//     }
// }



export function updateRecipe (data) {
    return dispatch => {
        //console.log(data)
        //console.log(data.id)
        axios.put(`http://localhost:8009/api/v1/recipes/${data.id}`, data)
        .then(() => dispatch(
            //console.log(data),
            recipeUpdated(data)
        )).catch( error => {
            //console.log(error.message)
            error} )
            
        


    }
}

// export  {
//     updateRecipe,
//     recipeUpdated,
// }


// return fetch(`http://localhost:8009/api/v1/recipes/${data.id}`, {
//             method: 'put',
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(handleResponse)
//         .then(data => dispatch(recipeUpdated(data.recipe)))