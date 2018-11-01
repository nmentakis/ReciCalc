import React from 'react';

const Signup = () => (
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

export default Signup;
