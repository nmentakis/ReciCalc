import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './Header.jsx';
import Create from './Create.jsx';
import Recipes from './Recipes.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      username: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  login(usr, pss) {
    axios
      .post('/api/login', { username: usr, password: pss })
      .then(response => {
        console.log(response);
        this.setState({
          username: response.data[0].username,
          userId: response.data[0].id,
        });
        alert('Logged In Successfully!');
        sessionStorage.setItem('username', response.data[0].username);
        sessionStorage.setItem('userId', response.data[0].id);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div id="main">
        {/* Header is outside of the switch so that it is always displayed (except on landing page) */}
        <Header />
        <div>SIGNUP</div>
        <br />
        <Signup />
        <br />
        <div>LOGIN</div>
        <br />
        <Login login={this.login} />
        <Switch>
          <Route path="/create" component={Create} />
          {/* Recipes itself is a switch to either recipe list view or individual recipe view */}
          <Route path="/recipes" component={Recipes} />
          {/* can add a fallback error component: <Route component={ErrorNotFound} /> */}
        </Switch>
      </div>
    );
  }
}

export default Main;
