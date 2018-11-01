import React from 'react';
import { Input, Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleItemClick (e, { name }) { 
    console.log(name);
    this.setState({ 
      activeItem: name 
    });
    if (name == 'logout') {
      this.props.logout();  
    }
  }


  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item 
        name='create' 
        active={activeItem === 'create'} 
        onClick={this.handleItemClick} 
        href="/create"
        />
        <Menu.Item
          name='recipes'
          active={activeItem === 'recipes'}
          onClick={this.handleItemClick}
          href="/recipes"
        />
        <Menu.Menu position='right'>
          {/* <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item> */}
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
            href="/"
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;