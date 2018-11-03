import React, { Component } from 'react';

class ChangeUser extends Component {
  constructor(props){
    super(props);
    this.state ={
      token: localStorage.getItem('Token'),
      userId: sessionStorage.getItem('userId'),
      username: sessionStorage.getItem('username'),
      newUsername: '',
      password: ''
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePssChange = this.handlePssChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(e) {
    this.setState({
      newUsername: e.target.value
    });
  }
  handlePssChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    this.props.changeUser(this.state.newUsername, this.state.password);
    e.preventDefault();
  }
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui header">
          <div className="content">Change-Username</div>
        </h2>
          <form className="ui large form" onSubmit={this.handleSubmit} >
            <div className="ui stacked secondary  segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="username"
                    name="username"
                    value={this.state.newUsername}
                    placeholder="New Username"
                    onChange={this.handleUserChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handlePssChange}
                  />
                </div>
              </div>
            <button type="submit" className="ui fluid large teal submit button">
              Submit
            </button>
            {/* </div> */}
          </div>
          <div className="ui error message" />
        </form>
      </div>
    </div>
    )
  }
}
export default ChangeUser;