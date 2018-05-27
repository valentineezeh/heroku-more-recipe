import React from "react";
import PropTypes from 'prop-types';
import { CardDeck, CardGroup, CardColumns } from 'reactstrap';
import HomeCard from './homeCard.js';

export default function HomeList ({ recipes }){
    const emptyMessage = (
        <p align="center">There are no Recipe yet in the collection.</p>
    );

    const homeList = (
        
        <div>
            <CardColumns>
            {recipes.forEach((recipe) => {
                //console.log(recipe)
                return (
                    <HomeCard recipe={recipe} key={recipe.id} />
                )
            })}
          </CardColumns> 
        </div>     
);
return (
    <div>
        { recipes.length === 0 ? emptyMessage : homeList }
    </div>
);
}

HomeList.propTypes = {
    recipes:  PropTypes.array.isRequired,
    
    
}