import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeList from './RecipeList.js';
import { fetchRecipes } from '../../action/recipeAction.jsx';
import { deleteRecipe } from '../../action/deleteRecipeAction.jsx'
import { addFlashMessage } from '../../action/index.jsx';

class RecipesPage extends React.Component {
    componentDidMount(){
        this.props.fetchRecipes();
    }
    render(){
        return(
            <div>
                <h1 align="center">Recipes List</h1>
                <RecipeList recipes={this.props.recipes} deleteRecipe={this.props.deleteRecipe} addFlashMessage={addFlashMessage}/>
            </div>
        )
    } 
}

RecipesPage.propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchRecipes: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return{
        recipes: state.recipes
    }
}
export default connect(mapStateToProps, { fetchRecipes, deleteRecipe, addFlashMessage })(RecipesPage);