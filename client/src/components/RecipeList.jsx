import React, {Component} from 'react';
import RecipeListItem from './RecipeListItem.jsx';
import axios from 'axios';
class RecipeList extends Component {
    constructor(){
        super();
        this.state = {
          userId: 0 || sessionStorage.getItem('userId'),
          token: localStorage.getItem('Token'),
          allRecipes: []
        }
    }

  componentDidMount(){
    // make a get call to database @ api/recipes to retrieve all user recipes and setState
    // placeholder below
  
    axios.get(`/user/recipes/?Token=${this.state.token}`)
    .then(response => {
      let userRecipes= [];
      // checking for user recipes
      response.data.forEach(recipe => {
        if (recipe.user_id === Number(this.state.userId)) {
          userRecipes.push(recipe);
        }
      });
      // populate user recipes in state
      this.setState({allRecipes: userRecipes.map(recipe => {
          return {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            top_ingredients: recipe.top_ingredients
          };
      })});
    })
    .catch(error => {
      console.log('error: ', error);
    });
  }

  render() {
    return (
      <div id='recipe-list'>
        <h3>Saved Recipes: </h3>
        {console.log(this.state.allRecipes)}
        <ul>
        {/* render all user recipies in state */}
          {this.state.allRecipes.map(recipe => 
            <RecipeListItem key={recipe.id} recipe={recipe} />
          )}
        </ul>
      </div>
    )
  }
}

export default RecipeList;