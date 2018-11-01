import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onPssChange = this.onPssChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    axios.post('/api/signup', {username: this.state.username, password: this.state.password})
    .then ((response)=> {
      if (response.data.name) {
        alert('username already exists!');
      } else {
        alert('sign up successful!');
        // this.props.history.push('/login')
      }
    });
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


export default Signup;