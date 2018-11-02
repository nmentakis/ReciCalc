import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
//components
import Landing from './components/Landing.jsx';
import Main from './components/Main.jsx';
import Create from './components/Create.jsx';
import Recipes from './components/Recipes.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import NavBar from './components/NavBar.jsx';
import Account from './components/Account.jsx';

import { withFormik } from 'formik';
import Ingredient from './components/Ingredient.jsx';

// could be refactored as a functional component if state not needed
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
      username: null
    };
    this.logout = this.logout.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount(){
      this.setState({
        token: localStorage.getItem('Token'),
        userId: sessionStorage.getItem('userId'),
        username: sessionStorage.getItem('username')

      });
  }

  setUser(user, id, token) {
    this.setState({
      token: token,
      userId: id,
      username: user
    });
  }

  renderNav() {
    if (this.state.token) {
      return (<NavBar logout={this.logout} />)
    } else {
      console.log('hi')
    }
  }

  logout() {
    this.setState({
      token: 0,
      username: '',
      userId: 0,
    });
    sessionStorage.clear();
    localStorage.clear();
  }

  render() {
    return (
      // if Browser Router were imported without an alias, this outermost wrapper would be 'BrowserRouter', not 'Router'
      <div>

        <div>
          {this.renderNav()}
        </div>
        <Router>
            <Switch>
            <Route exact path = '/' render={() => <Landing />} />
              {/* All links from landing page are to a url that will render the main component */}
              {/* Main component is also a switch that will delegate  */}
              <Route path='/main' component={Main} />
              <Route path='/recipes' component={Recipes} />
              <Route path='/create' component={Create} />
              <Route path='/account' component={Account} />
              <Route path='/login' render={(props)=> <Login {...props} setUser={this.setUser} /> } />
              <Route path='/signup' render={(props)=> <Signup {...props} setUser={this.setUser} /> }/>
              <Route path='/ingredients' component={Ingredient}/>
            </Switch>
        </Router>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
