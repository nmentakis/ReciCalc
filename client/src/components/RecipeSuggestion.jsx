import React from 'react';
import { Container, Header, Search } from 'semantic-ui-react';
import axios from 'axios';
import recipeSeed from '../../../seed_data/suggestion.js';

// refactor to functional component?
class RecipeSuggestion extends React.Component {
  constructor() {
      super();
      this.state = {
        search: '',
        recipes: [recipeSeed],
        currentRecipe: recipeSeed,
        index: 0,
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.nextRecipe = this.nextRecipe.bind(this);
      this.prevRecipe = this.prevRecipe.bind(this);

  }

  handleSubmit(e){
    const get = {
      method: 'get',
      url: 'https://api.edamam.com/search',
      params: {
        app_id: '988c2ac9',
        app_key: '2f380c0898c8695e1bceb81f0bdae7df',
        q: this.state.search
      }
    }

    axios(get).then(data => {
      this.setState({recipes: data.data.hits, currentRecipe: data.data.hits[0]});
      console.log('Recipe Search', data)});

      e.preventDefault();
  }

  handleChange(event) {
    this.setState({search: event.target.value})
  }

  nextRecipe(){
  if(this.state.index === this.state.recipes.length-1){
    this.setState({currentRecipe: this.state.recipes[0], index: 0});
  } else{
    this.setState({currentRecipe: this.state.recipes[this.state.index+1], index: this.state.index+1});
  }
 
  }

  prevRecipe(){

    if(this.state.index === 0){
      this.setState({currentRecipe: this.state.recipes[this.state.recipes.length-1]});
      this.setState({index: this.state.recipes.length-1});
    } else{
    this.setState({currentRecipe: this.state.recipes[this.state.index-1]});
    this.setState({index: this.state.index-1});
    }

  }

  render () {
    let recipeUrl = this.state.currentRecipe.recipe.url || null;
    let recipeLabel = this.state.currentRecipe.recipe.label || null;
    let recipeIngredients = this.state.currentRecipe.recipe.ingredientLines || null;
    let recipeCalories = this.state.currentRecipe.recipe.calories.toFixed(0);
    return (<Container text fluid>
      <Header as='h2'>Recipe Suggestion</Header>
      <Header as='h4'><a href={recipeUrl ? recipeUrl : null}> {recipeLabel ? recipeLabel : null} </a></Header>
      <i className="fas fa-arrow-right" style={{float: 'right', padding: '20px'}} onClick={this.nextRecipe}></i>
      <i className="fas fa-arrow-left" style={{float: 'left', padding: '20px'}} onClick={this.prevRecipe} ></i>

      <form onSubmit={this.handleSubmit}>
       <input
         placeholder="Search for..."
         onChange={this.handleChange}
       />
     </form>

      <ul>
        {recipeIngredients ? recipeIngredients.map((ingredient, i) => <li key={i}>{ingredient}</li>) : null}
      </ul>

      

      Calories: {recipeCalories}
    </Container>)
  }
}
export default RecipeSuggestion;
