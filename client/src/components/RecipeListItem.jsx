import React from 'react';
import {Link} from 'react-router-dom';

const RecipeListItem = ({recipe}) => (
    <li className='recipe-item'>
      <Link className='list-title link' to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
      <p className='list-description'>{recipe.description}</p>
      <p className='list-top'>{recipe.top_ingredients}</p>
    </li>
);

export default RecipeListItem;