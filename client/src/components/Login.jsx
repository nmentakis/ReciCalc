import React from 'react';

import axios from 'axios';
import { withFormik, Form, Field } from 'formik';

const Login = ({ values, handleChange }) => (
  <div className="ui middle aligned center aligned grid">
    <div className="column">
      <h2 className="ui image header">
        <div className="content">Log-in to your account</div>
      </h2>
      <Form className="ui large form">
        <div className="ui stacked secondary  segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon" />
              <Field
                type="username"
                name="username"
                // value={values.username}
                placeholder="Username"
                // onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon" />
              <Field
                type="password"
                name="password"
                // value={values.password}
                placeholder="password"
                // onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="ui fluid large teal submit button"> */}
          <button type="submit">Login</button>
          {/* </div> */}
        </div>
        <div className="ui error message" />
      </Form>
      <div className="ui message">
        New to us?
        <a href="/login">
          {'  '}
          Sign Up
        </a>
      </div>
    </div>
  </div>
);

const FormikApp = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || '',
      password: password || '',
    };
  },
  login(usr, pss) {
    axios
      .post('/auth/login', { username: usr, password: pss })
      .then(response => {
        console.log(response);
        this.setState({
          username: response.data.user.username,
          userId: response.data.user.id,
        });
        alert("Logged In Successfully!");
        sessionStorage.setItem("username", response.data.user.username);
        sessionStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("Token", response.data.token);
        this.props.history.push("/recipes");
      })
      .catch(err => {
        console.log(err, 'errroor');
        alert('incorrect username or password');
      });

  },
  handleSubmit(values) {
    this.login(values.username, values.password);
  },
})(Login);


export default FormikApp;
