import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Create from './Create.jsx';
import Recipes from './Recipes.jsx';

const Main = () => (
  <div id='main'>
    {/* Header is outside of the switch so that it is always displayed (except on landing page) */}
    <Header />
    <Switch>
      <Route path='/create' component={Create} />
      {/* Recipes itself is a switch to either recipe list view or individual recipe view */}
      <Route path='/recipes' component={Recipes} />
      {/* can add a fallback error component: <Route component={ErrorNotFound} /> */}
    </Switch>
  </div>
)

export default Main;