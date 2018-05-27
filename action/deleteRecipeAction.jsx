import axios from 'axios'

const RECIPE_DELETED = 'RECIPE_DELETED';

export function recipeDeleted (recipeId) {
    return {
        type: RECIPE_DELETED,
        recipeId
    }
}

export function deleteRecipe (id)  {
    return dispatch => {
        return axios.delete(`http://localhost:8009/api/v1/recipes/${id}`)
        .then(() => dispatch(recipeDeleted(id)))
    }
}