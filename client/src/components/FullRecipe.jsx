import React, {Component} from 'react';
import axios from 'axios';

class FullRecipe extends Component {
  constructor(props) {
      super(props);
      this.state = {
        token: localStorage.getItem('Token')
      }
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    // make call to database for particular recipe referencing {this.props.match.params.id} to retrieve recipe by id number
    // recipe object returned in format below. hardcoding example for testing
    axios
    .get(`/user/recipes/${this.props.match.params.id}/?Token=${this.state.token}`)
    .then(response => {
      console.log(response);
      console.log('successful fullrecipe.jsx request', response.data[0][0].ingredients);
      this.setState({
        recipe: {
          title: response.data[0][0].name,
          id: response.data[0][0].id,
          description: response.data[0][0].description,
          topIngredients: response.data[0][0].topIngredients,
          ingredients: response.data[0][0].ingredients ? response.data[0][0].ingredients.map(ingredient => {
            return {
              name: ingredient.name,
              ndbno: ingredient.ndbno,
              quantity: ingredient.quantity,
              nutrition: {
                kcalPer: parseFloat(ingredient.nutrients.kcal_per),
                fatPer: parseFloat(ingredient.nutrients.fat_per),
                satFatPer: parseFloat(ingredient.nutrients.sat_fat_per),
                fiberPer: parseFloat(ingredient.nutrients.fiber_per),
                cholesterolPer: parseFloat(ingredient.nutrients.cholesterol_per),
                sodiumPer: parseFloat(ingredient.nutrients.sodium_per),
                carbsPer: parseFloat(ingredient.nutrients.carbs_per),
                sugarPer: parseFloat(ingredient.nutrients.sugar_per),
                proteinPer: parseFloat(ingredient.nutrients.protein_per)
              }
          }}) : [],
          instructions: response.data[0][0].instructions
        }
      })
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }

  calculateNutrition(){
    const {recipe} = this.state
    let totalNutrition = {
      kcalPer: 0,
      fatPer: 0,
      satFatPer: 0,
      fiberPer: 0,
      cholesterolPer: 0,
      sodiumPer: 0,
      carbsPer: 0,
      sugarPer: 0,
      proteinPer: 0
    };
    for (let ingredient of recipe.ingredients) {
      for (let nutrient in ingredient.nutrition) {
        if (!isNaN(ingredient.nutrition[nutrient])) {
          let ingredientNutrientContribution = parseFloat(ingredient.nutrition[nutrient]*ingredient.quantity/100);
          totalNutrition[nutrient] = totalNutrition[nutrient] + ingredientNutrientContribution  || ingredientNutrientContribution; 
        } else {
          totalNutrition[nutrient] = totalNutrition[nutrient] || 0;
        }
      }
    }
    console.log('calculated nutrition: ', totalNutrition);
    return totalNutrition;
  }

  render () {
    const {recipe} = this.state;
    if (recipe === undefined) {
      return(<div></div>)
    } else {
      let nutritionObject = this.calculateNutrition();
      return (
        <div className="ui stacked secondary  segment" id="full-recipe">

          <h3>{recipe.title}</h3>
          {console.log(recipe)}
          <p id='full-description'>{recipe.description}</p>
          <ul className='full-list'>
            <h4>Ingredients:</h4>
            {recipe.ingredients.map(ingredient => 
              <li key={ingredient.ndbno}>{ingredient.name}  -  {ingredient.quantity} grams</li>)}
          </ul>
          <ol className='full-list'>
            <h4>Instructions:</h4>
            {recipe.instructions}
          </ol>
          <div id='nutrition'>
            <h4>Nutrition Information:</h4>
            <ul id='nutrient-list' className='full-list'>
              <li className='nutrient'>Calories: {nutritionObject.kcalPer.toFixed(2)} cals</li>
              <li className='nutrient'>Total Fat: {nutritionObject.fatPer.toFixed(2)} g</li>
              <li className='nutrient'>Saturated Fat: {nutritionObject.satFatPer.toFixed(2)} g</li>
              <li className='nutrient'>Cholesterol: {nutritionObject.cholesterolPer.toFixed(2)} mg</li>
              <li className='nutrient'>Sodium: {nutritionObject.sodiumPer.toFixed(2)} mg</li>
              <li className='nutrient'>Total Carbohydrates: {nutritionObject.carbsPer.toFixed(2)} g</li>
              <li className='nutrient'>Sugar: {nutritionObject.sugarPer.toFixed(2)} g</li>
              <li className='nutrient'>Fiber: {nutritionObject.fiberPer.toFixed(2)} g</li>
              <li className='nutrient'>Protein: {nutritionObject.proteinPer.toFixed(2)} g</li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default FullRecipe;