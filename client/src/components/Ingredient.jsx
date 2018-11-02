import React from 'react'
import { Grid, Image, Container, Header } from 'semantic-ui-react'
import RecipeSuggestion from './RecipeSuggestion.jsx';
import axios from 'axios';
import IngredientName from './IngredientName.jsx';

class Ingredient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      nameMatches: [],
      token: localStorage.getItem('Token'), 
      ingredients: [],
      quantity: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAmount = this.onAmount.bind(this)
    this.getNdbno = this.getNdbno.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    // this.onKeyPress = this.onKeyPress.bind(this);    
  }
  
  updateSelection(name){
    // keep track of which option user has selected from nameMatches array
    let updateObject = this.state.nameMatches.filter(nameMatch => nameMatch.name === name)[0];
    // if (this.state.quantity === "") {
    //   throw alert('Please enter an amount!')
    // }
    updateObject['quantity'] = this.state.quantity
    let newIngredient = this.state.ingredients.concat(updateObject)
    this.setState({
      ingredients: newIngredient,
      quantity: '',
      search: '',
      nameMatches: [],
    })
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.search)
    this.getNdbno(this.state.search)
  }
  
  // set state while typing
  onChange(e) {
    this.changeState(e.target.value);
  }
  
  changeState(value) {
    this.setState({
      search: value
    });

  }

  onAmount(e) {
    this.changeAmount(e.target.value)
  }

  changeAmount(value) {
    this.setState({
      quantity: value
    })
  }
  getNdbno(query){
    axios.get(`user/ingredients/usda/?Token=${localStorage.getItem('Token')}`, {
      params: {
        searchTerm: `${query}`,
        // offset used so that not all results from api are returned at once
        page: -1
      },
      headers: {"Authorization" : `Bearer ${localStorage.getItem('Token')}`}
    })
    .then((data) => {
      console.log(data);
      const list = data.data.map(item => {
        return {name : item.name, ndbno: item.ndbno}; 
      });
      this.setState({nameMatches: list});
    })
    .catch(error => {
      throw(error)
    });    
  }

  render(){
    return (
  <Grid celled>
    <Grid.Row>
      <Grid.Column width={13}>
        <form onSubmit={this.handleSubmit}>
          Search for an Ingredient: <input value = {this.state.search} onChange = {this.onChange}  placeholder='type in an ingredient'/>        
          <input className='submit' type='submit' value='Search'/>
          <span> How many grams?   </span><input type='number' value={this.state.quantity} onChange={this.onAmount} placeholder='enter an amount'></input>
        </form>
        <h3 className='ingredient-input'>Add an Ingredient</h3>
        <div>
          <ul>
          {this.state.nameMatches.map((nameMatch, i) => <IngredientName object={nameMatch} value={nameMatch.name} key={i} update={this.updateSelection}/>)}
          </ul>
        </div>
      </Grid.Column>
      <Grid.Column width={6}>
      <h3 className='ingredient-input'>Your Ingredients!</h3>
      <ul>
      {this.state.ingredients.map((ingredient, i) => <li key={i}>{ingredient.name}  {ingredient.quantity ? ' : ' + ingredient.quantity + ' grams' : ''}</li>)}
      </ul>
      </Grid.Column>
      <Grid.Column floated='right' width={3}>

        <RecipeSuggestion/>
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' /> */}
      </Grid.Column>
    </Grid.Row>
  </Grid>
    )
  }
}


export default Ingredient;