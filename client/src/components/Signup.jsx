import React from 'react';

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
    axios.post('/auth/signup', {username: this.state.username, password: this.state.password})
    .then ((response)=> {
      if (response.data.name) {
        alert('username already exists!');
      } else {
        alert('sign up successful!');
        axios.post('/auth/login', {username: this.state.username, password: this.state.password}) 
        .then ((response)=> {
          console.log(response);
          this.setState({
            username: response.data.user.username,
            userId: response.data.user.id
          });
          sessionStorage.setItem('username', response.data.user.username);
          sessionStorage.setItem('userId', response.data.user.id);
          localStorage.setItem('Token', response.data.token);
          this.props.history.push('/create');
        })
        .catch((err) => {
          console.log(err, 'errroor')
          alert('incorrect username or password')
        });
      }
      
    });
    e.preventDefault();
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui image header">
          <div className="content">Sign Up</div>
        </h2>
        <form
          action="https://s.codepen.io/voltron2112/debug/PqrEPM?"
          method="get"
          className="ui large form">
          <div className="ui stacked secondary  segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input type="text" name="email" placeholder="Username" />{' '}
                {/*Fix Me */}
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input type="password" name="password" placeholder="Password" />
              </div>
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="ui fluid large teal submit button">Sign Up</div>
          </div>
  
          <div className="ui error message" />
        </form>
      </div>
    </div>
  );
  

    }
  }

export default Signup;
