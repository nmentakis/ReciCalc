import React from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';

const Signup = () => (
  <div className="ui middle aligned center aligned grid">
    <div className="column">
      <h2 className="ui header">
        <div className="content">Sign Up</div>
      </h2>
      <Form className="ui large form">
        <div className="ui stacked secondary  segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon" />
              <Field
                type="username"
                name="username"
                placeholder="Username"
              />{' '}
              {/*Fix Me */}
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon" />
              <Field
                type="password"
                name="password"
                placeholder="Password"
              />{' '}
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
          <button
            className="ui fluid large teal submit button"
            type="submit"
            href="/signup">
            Sign Up
          </button>
        </div>
        {/* </div> */}

        <div className="ui error message" />
      </Form>
    </div>
  </div>
);

const SuperSubmit = withFormik({
  mapPropsToValues({ username, password, history }) {
    return {
      username: username || '',
      password: password || '',
      history: history
    };
  },
  
  handleSubmit(value) {
    axios
      .post('/auth/signup', {
        username: value.username,
        password: value.password,
      })
      .then(response => {
        if (response.data.name) {
          alert('username already exists!');
        } else {
          alert('sign up successful!');
          axios
            .post('/auth/login', {
              username: response.data.user.username,
              password: response.data.user.password,
            })
            .then(response => {
              console.log(response);
              this.setState({
                username: response.data.user.username,
                userId: response.data.user.id,
              });
              alert('Logged In Successfully!');
              sessionStorage.setItem('username', response.data.user.username);
              sessionStorage.setItem('userId', response.data.user.id);
              localStorage.setItem('Token', response.data.token);
              this.props.history.push('/recipies');
            })
            .catch(err => {
              console.log(err, 'errroor');
              alert('incorrect username or password');
            });
        }
      });
    e.preventDefault();
  },
})(Signup);

export default SuperSubmit;
