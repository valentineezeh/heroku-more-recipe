import React from "react";
import PropTypes from 'prop-types';
import { CardDeck, CardGroup, CardColumns } from 'reactstrap';
import RecipeCard from './RecipeCard.js';


export default function RecipesList({ recipes, deleteRecipe }) {
    
    const emptyMessage = (
        <p>There are no Recipe yet in the collection.</p>
    );

    const recipeList = (
       console.log(recipes),
            <div>
                <CardColumns>
                {recipes.map((recipe) => {
                    return (
                        <RecipeCard recipe={recipe} key={recipe.id}  deleteRecipe={deleteRecipe}/>
                    )
                })}
              </CardColumns>
            </div>
        
  //{ recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id}/>) }
           
    );
    return (
        <div>
            { recipes.length === 0 ? emptyMessage : recipeList }
        </div>
    );

}
RecipesList.propTypes = {
    recipes:  PropTypes.array.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    
}
