import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Main from './components/Main.jsx';


// could be refactored as a functional component if state not needed
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // considering keeping an interim copy of a user recipe here in case they 
      // navigate away from the create page before submitting
    }
  }

  render () {
    return (
      // if Browser Router were imported without an alias, this outermost wrapper would be 'BrowserRouter', not 'Router'
      <Router>
          <Switch>
            <Route exact path = '/' component={Landing} />
            {/* All links from landing page are to a url that will render the main component */}
            {/* Main component is also a switch that will delegate  */}
            <Route component={Main} />
          </Switch>
      </Router>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));