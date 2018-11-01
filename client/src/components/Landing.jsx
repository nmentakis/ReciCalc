import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login.jsx';

const Landing = () => (
  <div id='landing'>
    <h1 id='landing-logo' className='logo'>RECI-CALC</h1>
    <div id='landing-box'>
      <span id='landing-text'>Welcome to Hack Reactor's best recipe storage and nutritional calculator</span>
      <Login/>
      <Link className='nav link' to='/create'>Create New Recipe</Link>
      <Link className='nav link' to='/recipes'>Recipes</Link>
    </div>
  </div>
);

export default Landing;