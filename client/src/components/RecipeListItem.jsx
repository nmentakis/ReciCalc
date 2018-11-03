import React from 'react';
import {Link} from 'react-router-dom';
import { Card, CardGroup, Button } from 'semantic-ui-react';

const RecipeListItem = ({recipe, deleteOne}) => (
    <Card raised>
      <Card.Content
        header={recipe.name}
        description={
          <div>
          <ul>
            {recipe.ingredients.map((ingredient,i) => (<li key={i}>{ingredient.name}</li> ))}
          </ul>
          <p>{JSON.stringify(recipe.description)}</p> </div>
          }
      />
      <Card.Content extra>
        <div className='ui two buttons'>
        <Button basic color='red' onClick={() => deleteOne(recipe.id)}>
            Delete
          </Button>
          <Button basic color='green' href={`/recipes/${recipe.id}`}>
            More Info
          </Button>
        </div>

      </Card.Content>
    </Card>
);

export default RecipeListItem;