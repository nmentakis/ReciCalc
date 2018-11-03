import React, { Component } from 'react';

class ChangePass extends Component {
  constructor(props){
    super(props);
    this.state ={
      token: localStorage.getItem('Token'),
      userId: sessionStorage.getItem('userId'),
      username: sessionStorage.getItem('username'),
      oldPassword: '',
      newPassword: '',
      confirmation: ''
    };
    this.handleOld = this.handleOld.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOld(e) {
    this.setState({
      oldPassword: e.target.value
    });
  }
  handleNew(e) {
    this.setState({
      newPassword: e.target.value
    });
  }

  handleConfirm(e) {
    this.setState({
      confirmation: e.target.value
    });
  }

  handleSubmit(e) {
    console.log(this.state.newPassword, this.state.confirmation);
    if (this.state.newPassword == this.state.confirmation) {
      this.props.changePass(this.state.oldPassword, this.state.newPassword, this.state.confirmation);
    } else {
      alert('passwords dont match!');
      console.log(this.state.newPassword, this.state.confirmation);
    }
    e.preventDefault();
  }
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui header">
          <div className="content">Change-Password</div>
        </h2>
          <form className="ui large form" onSubmit={this.handleSubmit} >
            <div className="ui stacked secondary  segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    value={this.state.newUsername}
                    placeholder="Old Password"
                    onChange={this.handleOld}
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
                    placeholder="New password"
                    onChange={this.handleNew}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    value={this.state.confirmation}
                    placeholder="Confirm new password"
                    onChange={this.handleConfirm}
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
export default ChangePass;