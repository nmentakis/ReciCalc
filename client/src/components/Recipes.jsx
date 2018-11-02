import React from 'react';
import {Switch, Route} from 'react-router-dom';
import RecipeList from './RecipeList.jsx';
import FullRecipe from './FullRecipe.jsx';

const Recipes = () => (
    <Switch>
      <Route exact path='/recipes' component={RecipeList}/>
      <Route path='/recipes/:id' component={FullRecipe}/>
    </Switch>
  )

export default Recipes;