import React from 'react';
import axios from  'axios';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onPssChange = this.onPssChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.login = this.login.bind(this);
  }

  login(usr, pss) {
    axios.post('/auth/login', {username: usr, password: pss}) 
    .then ((response)=> {
      console.log(response);
      this.setState({
        username: response.data.user.username,
        userId: response.data.user.id
      });
      alert('Logged In Successfully!');
      sessionStorage.setItem('username', response.data.user.username);
      sessionStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('Token', response.data.token);
      this.props.history.push('/recipes');
    })
    .catch((err) => {
      console.log(err, 'errroor')
      alert('incorrect username or password')
    });
  }

  onUserChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  onPssChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    this.login(this.state.username,this.state.password);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='user-input'>
            <input type='username' value={this.state.username} onChange={this.onUserChange} placeholder='username' required/>
          </div>
          <div className='pss-input'>
            <input type='password' value={this.state.password} onChange={this.onPssChange} placeholder='password'/>
          </div>
          <input className='sign-up-submit' type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}

export default Login;