import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Card, CardImg, CardText, CardBody, CardTitle, CardDeck, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const HomeCard = ({ recipe }) => {
    return (
        <div>
        <Card>
      <CardImg top width="100%" src={recipe.imageUrl} alt="Card image cap" />
      <CardBody>
        <CardTitle>{recipe.title}</CardTitle>
        <CardText>{recipe.description}</CardText>
        </CardBody>
        </Card>
        </div>
    );
}

HomeCard.propTypes = {
    recipe: PropTypes.array.isRequired,
}
export default HomeCard;