import React from 'react';
import { Grid, Image, Container, Header, Button } from 'semantic-ui-react';
import RecipeSuggestion from './RecipeSuggestion.jsx';
import axios from 'axios';
import IngredientName from './IngredientName.jsx';
import { Link, withRouter } from 'react-router-dom';
import parser from '../../../helpers/parsers.js'

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      nameMatches: [],
      token: localStorage.getItem('Token'),
      ingredients: [],
      quantity: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAmount = this.onAmount.bind(this);
    this.getNdbno = this.getNdbno.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.postToDatabase = this.postToDatabase.bind(this);
    // this.onKeyPress = this.onKeyPress.bind(this);
  }

  async updateSelection(name) {
    // keep track of which option user has selected from nameMatches array
    let updateObject = this.state.nameMatches.filter(
      nameMatch => nameMatch.name === name,
    )[0];
    updateObject['quantity'] = this.state.quantity;
    await this.postToDatabase(updateObject);
    let newIngredient = this.state.ingredients.concat(updateObject);
    this.setState({
      ingredients: newIngredient,
      quantity: '',
      search: '',
      nameMatches: [],
    });
  }

  handleClick(e) {

    e.preventDefault();
    this.props.saveIngredients(this.state.ingredients);
    this.props.history.push('/instructions')
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getNdbno(this.state.search);
  }

  // set state while typing
  onChange(e) {
    this.changeState(e.target.value);
  }

  changeState(value) {
    this.setState({
      search: value,
    });
  }

  onAmount(e) {
    this.changeAmount(e.target.value);
  }

  changeAmount(value) {
    this.setState({
      quantity: value,
    });
  }
  getNdbno(query) {
    axios
      .get(`user/ingredients/usda/?Token=${localStorage.getItem('Token')}`, {
        params: {
          searchTerm: `${query}`,
          // offset used so that not all results from api are returned at once
          page: 1,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .then(data => {
        const list = data.data.map(item => {
          return { name: item.name, ndbno: item.ndbno };
        });
        this.setState({ nameMatches: list });
      })
      .catch(error => {
        throw error;
      });
  }

  postToDatabase(selection) {
    axios
      .get(
        `user/ingredients/usda/${selection.ndbno}/?Token=${this.state.token}`
      )
      .then(data => {
        selection['nutrients'] = data.data.nutrients;
        selection['nutrients'] = parser.usdaIngredientToDatabase(selection)
        // delete selection['nutrients']['ndbno'];
        // delete selection['nutrients']['name'];
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteIngredient(index) {
    let ingredients = this.state.ingredients;
    ingredients.splice(index, 1);
    this.setState({
      ingredients: ingredients
    });
  }

  render() {
    return (
      <React.Fragment>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={13}>
              <form onSubmit={this.handleSubmit}>
                Search for an Ingredient:{' '}
                <input
                  value={this.state.search}
                  onChange={this.onChange}
                  placeholder="type in an ingredient"
                />
                <input className="submit" type="submit" value="Search" />
                <span> How many grams? </span>
                <input
                  type="number"
                  value={this.state.quantity}
                  onChange={this.onAmount}
                  placeholder="enter an amount"
                />
              </form>
              <h3 className="ingredient-input">Add an Ingredient</h3>
              <div>
                <ul>
                  {this.state.nameMatches.map((nameMatch, i) => (
                    <IngredientName
                      object={nameMatch}
                      value={nameMatch.name}
                      key={i}
                      update={this.updateSelection}
                    />
                  ))}
                </ul>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 className="ingredient-input">Your Ingredients!</h3>
              <ul>
                {this.state.ingredients.map((ingredient, i) => (
                  <div>
                    <li className="list-ingredient" key={i} onClick={() => this.postToDatabase(ingredient)}>
                      {' '}
                      {ingredient.name}{' '}
                      {ingredient.quantity
                        ? ' : ' + ingredient.quantity + ' grams'
                        : ''}{' '}
                    </li>
                    <div id='delete-ingr' key={i} onClick={()=> this.deleteIngredient(i)}>delete</div>
                  </div>
                ))}
              </ul>
            </Grid.Column>
            <Grid.Column floated="right" width={3}>
              <RecipeSuggestion />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button className="ui fluid large teal submit button" onClick={this.handleClick}>Move to Instructions</Button>
        {/* <Link className="ui fluid large teal submit button" to="/instructions">
          Move to Instructions
        </Link> */}
      </React.Fragment>
    );
  }
}

export default withRouter(Ingredient);
