import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
//components
import Landing from './components/Landing.jsx';
import Instruction from './components/Instructions.jsx';
import Create from './components/Create.jsx';
import Recipes from './components/Recipes.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import NavBar from './components/NavBar.jsx';
import Account from './components/Account.jsx';
import HeaderBanner from './components/Header.jsx';
import Ingredient from './components/Ingredient.jsx';

import { withFormik } from 'formik';
import { Header } from 'semantic-ui-react';

// could be refactored as a functional component if state not needed
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
      username: null,
      title: '',
      description: '',
      ingredients: [],
      instructions: [],
    };
    this.logout = this.logout.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.setUser = this.setUser.bind(this);
    this.saveIngredients = this.saveIngredients.bind(this);
    this.saveInstructions = this.saveInstructions.bind(this);
    this.saveDescription = this.saveDescription.bind(this);
    this.postRecipe = this.postRecipe.bind(this);
  }

  componentDidMount() {
    this.setState({
      token: localStorage.getItem('Token'),
      userId: sessionStorage.getItem('userId'),
      username: sessionStorage.getItem('username'),
    });
  }

  saveIngredients(ingredients){
    this.setState({ingredients});

  }


  saveInstructions(instructions){
    this.setState({instructions}, () => {
      this.postRecipe();
    });
  }

  saveDescription(title, description){
    this.setState({ title, description });
  }

  postRecipe() {
 
      const recipe = Object.assign({}, this.state);
      recipe['user_id'] = this.state.userId;
      // database expects an array of strings for instructions
        axios
        .post(`/user/recipes/?Token=${this.state.token}`, {
          recipe,
        })
        .then(response => {
          // console.log(response);
          // response contains the database id for the newly created recipe
          // use this to redirect to the full recipe view for that recipe
          // (this.props.history.push can be used because component is wrapped by withRouter - see export statement)
          this.props.history.push(`/ingredients`);
        })
        .catch(err => {
          console.error(err);
        });
    }
  



  setUser(user, id, token) {
    this.setState({
      token: token,
      userId: id,
      username: user,
    });
  }

  renderNav() {
    if (this.state.token) {
      return (
        <div>
          <HeaderBanner/>
          <NavBar logout={this.logout} />
        </div>
      );
    } else {
      return;
    }
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  render() {
    return (
      // if Browser Router were imported without an alias, this outermost wrapper would be 'BrowserRouter', not 'Router'
      <div>
        <div>{this.renderNav()}</div>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Landing />} />
            <Route
              path="/recipes"
              render={() =>
                localStorage.getItem('Token') ? (
                  <Recipes />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/create"
              render={(props) =>
                localStorage.getItem('Token') ? (
                  <Create {...props} saveDescription={this.saveDescription} newState={this.state}/>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/account"
              render={(props) =>
                localStorage.getItem('Token') ? (
                  <Account {...props} logout={this.logout} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/login"
              render={props => <Login {...props} setUser={this.setUser} />}
            />
            <Route
              path="/signup"
              render={props => <Signup {...props} setUser={this.setUser} />}
            />
            <Route
              path="/ingredients"
              render={(props) =>
                localStorage.getItem('Token') ? (
                  <Ingredient {...props} saveIngredients={this.saveIngredients}/>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              path="/instructions"
              render={(props) =>
                localStorage.getItem('Token') ? (
                  <Instruction {...props }saveInstructions={this.saveInstructions} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/main"
              render={() =>
                localStorage.getItem('Token') ? (
                  <CreateRouter />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
