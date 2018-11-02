import React, { Component } from 'react'

class Account extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token: localStorage.getItem('Token'),
      userId: sessionStorage.getItem('userId'),
      username: sessionStorage.getItem('username')
    };
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}


export default Account;