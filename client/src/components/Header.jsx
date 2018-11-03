import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// refactor to functional component?
class HeaderBanner extends Component {
  constructor() {
      super();
      this.state = {
        // does this need to be a class component?
      }
  }

  render () {
      return (
      <div>
        <h3 id='headerBanner' className='logo'/>
      </div>)
  }
}
export default HeaderBanner;