import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

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

      </div>
    );
  }
}

export default Main;
