import React, {Component} from 'react';
import RecipeListItem from './RecipeListItem.jsx';
import axios from 'axios';
import { Card, CardGroup, Header} from 'semantic-ui-react';

class RecipeList extends Component {
    constructor(){
        super();
        this.state = {
          token: localStorage.getItem('Token'),
          userId: 0 || sessionStorage.getItem('userId'),
          allRecipes: [],
          previousRecipes: [],
          delete: false,
        }
        this.deleteOne = this.deleteOne.bind(this);
        this.getSavedRecipes = this.getSavedRecipes.bind(this);
    }

  componentDidMount(){
    setTimeout(this.getSavedRecipes, 100);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.delete){
      console.log('componentDidUpdate', this.state.previousRecipes);
      this.getSavedRecipes();
      this.setState({delete: false})
    }
  }


  getSavedRecipes(){
    axios.get(`/user/recipes/?Token=${this.state.token}`)
    .then(response => {
      let userRecipes= [];
      // checking for user recipes
      response.data.forEach(recipe => {
        if (recipe.user_id === Number(this.state.userId)) {
          userRecipes.push(recipe);
        }
      });
      // this.setState({previousRecipes: this.state.allRecipes});

      // populate user recipes in state
      this.setState({allRecipes: userRecipes.map(recipe => {
          return {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            top_ingredients: recipe.top_ingredients,
            ingredients: recipe.ingredients
          };
      })});
    })
    .catch(error => {
      console.log('error: ', error);
    });
  }




  deleteOne(recipeId){
    const post = {
      url: `user/recipes/delete/?Token=${this.state.token}`,
      method: 'post',
      data: { recipeId }
    }
    axios(post).then(response => {
      console.log(response)
      this.setState({delete: true});
      this.getSavedRecipes();

    }).catch(error => {
      console.error(error);
    })
  }

  render() {
    return (
      <Card.Group itemsPerRow={3}>
      {this.state.allRecipes.map((recipe, index) => (<RecipeListItem key={index} recipe={recipe} deleteOne={this.deleteOne}/>))}
      </Card.Group>
    )
  }
}

export default RecipeList;