import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Card, CardImg, CardText, CardBody, CardTitle, CardDeck, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../utils/setAuthorizationToken.js';




const RecipeCard = ({ recipe, auth, deleteRecipe }) => {
  //console.log(recipe.id)
  //const { isAuthenticated, user } = this.props.auth;
  //console.log( auth.user )
  // let token = localStorage.jwtToken
  // let tokenDecode = jwt.decode(token).id
  // console.log(tokenDecode)

  // let userId = auth.user.id
  // //console.log(userId)

  // let isMyRecipe = tokenDecode === userId
  //console.log(isMyRecipe)



  return (
  <div>
      
 
    <Card>
      <CardImg top width="100%" src={recipe.imageUrl} alt="Card image cap" />
      <CardBody>
        <CardTitle>{recipe.title}</CardTitle>
        <CardText>{recipe.description}</CardText>
       <ButtonGroup size="sm">
       <Link to={`/recipe/${recipe.id}`}> 
       <Button color='primary'>Edit</Button>
       </Link>
        <Button color='danger' onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
        </ButtonGroup>
        </CardBody>
        </Card>
    </div>
  
  );
}

RecipeCard.propTypes = {
  recipe:  PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
 
}

function mapStateToProps(state) {
  return {
      auth: state.auth
  };
}

export default connect(mapStateToProps)(RecipeCard);