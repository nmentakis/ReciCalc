import React, { Component } from 'react';
import axios from 'axios';
import ChangeUser from './ChangeUser.jsx';
import ChangePass from './ChangePass.jsx';
import {Menu} from 'semantic-ui-react';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token: localStorage.getItem('Token'),
      userId: sessionStorage.getItem('userId'),
      username: sessionStorage.getItem('username'),
      newUsername: '',
      password: '',
      activeItem: ''
    };
    this.changeUser = this.changeUser.bind(this);
    this.changePass = this.changePass.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  changeUser(newUsername, password) {
    axios.post(`/user/changeUsername/?Token=${this.state.token}`, {
      newUsername: newUsername, 
      username:this.state.username, 
      password: password
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  changePass(op,np,c){
    console.log(op,np,c);
  }

  handleItemClick(e, { name }) { 
    console.log(name);
    this.setState({ activeItem: name });
    if (name === 'logout') {
      this.props.logout();
    }
  }

  render() {
    let comp;
    if(this.state.activeItem === 'username'){
      comp = <ChangeUser changeUser={this.changeUser}/>;
   } else if(this.state.activeItem === 'password') {
      comp = <ChangePass changePass={this.changePass}/>;
   } 
    return (
      <div>
      <Menu secondary vertical>
        <Menu.Item name='username' active={this.state.activeItem === 'username'} onClick={this.handleItemClick}/>
        <Menu.Item name='password' active={this.state.activeItem === 'password'} onClick={this.handleItemClick} />
        <Menu.Item name='logout' active={this.state.activeItem === 'logout'} onClick={() => this.props.logout()} href='/'/>
      </Menu>
      {comp} 
      </div>
    )
  }
}


export default Account;