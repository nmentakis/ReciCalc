import React from 'react';
import {Link} from 'react-router-dom';
import { Card, CardGroup, Button } from 'semantic-ui-react';

const RecipeListItem = ({recipe, deleteOne}) => (
    <Card raised>
    <Card.Content
        header={recipe.name}
        meta={recipe.name}
        description={recipe.description}
      />
      <Card.Content extra>
          <Button basic color='red' onClick={() => deleteOne(recipe.id)}>
            Delete
          </Button>
      </Card.Content>
    </Card>
);

export default RecipeListItem;