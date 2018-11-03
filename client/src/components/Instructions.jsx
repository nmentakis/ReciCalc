import React from 'react';
import { Link } from 'react-router-dom';

const Instruction = props => {
  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui header">
          <div className="content">Add your Instructions</div>
        </h2>
        <form className="ui large form">
          <div className="ui stacked secondary  segment">
            <div className="field">
              <div className="ui left icon input">
                <textarea
                  type="username"
                  name="username"
                  placeholder="Instructions"
                />
              </div>
            </div>
            <Link
              type="submit"
              className="ui fluid large teal submit button"
              to="/recipes">
              Move to Recipes
            </Link>
          </div>
          <div className="ui error message" />
        </form>
      </div>
    </div>
  );
};

export default Instruction;
