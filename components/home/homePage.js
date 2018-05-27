import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeList from './homeList.js';
import { fetchAllRecipes } from '../../action/allRecipeAction.js';

class HomePage extends React.Component {
    componentDidMount(){
        this.props.fetchAllRecipes();
    }
    render(){
        return(
            <div>
                <h1 align="center" >All Recipes List</h1>
                <HomeList recipes={this.props.recipes}  />
            </div>
        )
    } 
}

HomePage.propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchAllRecipes: PropTypes.func.isRequired,
    
}

function mapStateToProps(state){
    
    return{
        recipes: state.recipes, 
    }
}
export default connect(mapStateToProps, { fetchAllRecipes})(HomePage);