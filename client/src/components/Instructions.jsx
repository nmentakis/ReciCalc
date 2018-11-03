import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class Instruction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instructions: ""
    }
    this.updateInstructions = this.updateInstructions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  updateInstructions(e) {

    this.setState({ instructions: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    console.log(history)
    this.props.saveInstructions(this.state.instructions);
    this.props.history.push('/recipes')
  }


  render() {
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
                    onChange={this.updateInstructions}
                  />
                </div>
              </div>
              <Button className="ui fluid large teal submit button" onClick={this.handleClick}>MoveRecipes</Button>
            </div>
            <div className="ui error message" />
          </form>
        </div>
      </div>
    );
  };
}

export default withRouter(Instruction);
