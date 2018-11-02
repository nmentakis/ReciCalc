import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login.jsx';
// import main from '../../dist/assets/css/main.css';

const Landing = () => (
  <div>
    <div id="wrapper">
      {/* <!-- Header --> */}
      <header id="header">
        <div className="logo">
          <i className="fas fa-book-open fa-2x" />
        </div>
        <div className="content">
          <div className="inner">
            <h1>Reci-Calc</h1>
            <p>
              A fully responsive app designed by a group of amazing engineers
              who love css
            </p>
          </div>
        </div>
        <nav>
          <ul>
            {/* <li><a href="intro">Intro</a></li>
								<li><a href="work">Work</a></li>
                <li><a href="about">About</a></li> */}
            <li>
              <Link className="nav link" to="/create">
                Create New Recipe
              </Link>
            </li>
            <li>
              <Link className="nav link" to="/recipes">
                Recipes
              </Link>
            </li>
            <li>
              <a href="signup">Signup</a>
            </li>
            <li>
              <a href="login">Login</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* <!-- Footer --> */}
      <footer id="footer">
        <p className="copyright">&copy; Classic</p>
      </footer>
    </div>
    <div id="bg" />
  </div>
);

export default Landing;
