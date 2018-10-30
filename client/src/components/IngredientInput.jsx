import React, {Component} from 'react';
const axios = require('axios')
class IngredientInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nameMatches: [],
          isValidating: false,
          currentOffset: -1,
          currentSelection: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getNdbno = this.getNdbno.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
        this.getFromDB = this.getFromDB.bind(this);
        this.postToDatabase = this.postToDatabase.bind(this);
    }

    handleChange(event){
      // below format used to destructure props for class-based components
      const {updateRecipe, index, ...rest} = this.props;
      if (this.state.currentOffset > -1) {
        this.setState({currentOffset: -1});
      }
      updateRecipe(['ingredients', event.target.name], event.target.value, index);
    }

    updateSelection(event){
      // keep track of which option user has selected from nameMatches array
      let updateObject = this.state.nameMatches.filter(nameMatch => nameMatch.name === event.target.value)[0];
      this.setState({currentSelection: updateObject});
    }

    getNdbno(query){
      axios.get('api/ingredients/usda', {
        params: {
          searchTerm: `${query}`,
          // offset used so that not all results from api are returned at once
          page: this.state.currentOffset
        }
      })
      .then((data) => {
        const list = data.data.map(item => {
          return {name : item.name, ndbno: item.ndbno}; 
        });
        this.setState({nameMatches: list});
      })
      .catch(error => {
        throw(error)
      });    
    }

    // search database to see if ingredient has already been saved there
    getFromDB(query){
      axios.get('api/ingredients', {
        params: {
          searchTerm : `${query}`
        }
      })
        .then(data => {
          const list = data.data.map((item, i) => {
            return {name : item.name, ndbno: item.ndbno}; 
          });
          if(list.length === 0) {
            // if no matching ingredient was found in directory, call API for matching ingredients
            this.getNdbno(this.props.ingredient.name);
          } else {
            // if database did return some matches, set them to be the nameMatches array in state
            this.setState({nameMatches: list});
          }
        })
        .catch(error => {
          console.log('error: error while searching in database', error)
        })
    }

    postToDatabase(selection){
      console.log(selection.ndbno)
      axios.get(`api/ingredients/usda/${selection.ndbno}`, {
      })
        .then(data => {
          console.log('success');
        })
        .catch(error => {
          console.log(error);
        })
    }

    validate() {
      const {ingredient, updateRecipe, index, ...rest} = this.props;
      // when user first clicks the 'validate' button
      if (!this.state.isValidating) {
        this.setState({isValidating: true})
        this.getFromDB(ingredient.name);
      } else {
        // if user has selected an item that has a meaningful value:
        if (this.state.currentSelection !== undefined && !(this.state.currentSelection === 'none of the above' || this.state.currentSelection === '')) {
          let selection = this.state.currentSelection;
          this.finalValidation(selection.ndbno, selection.name);
          // make sure selection exists in our ingredient database (insert it if it doesn't)
          this.postToDatabase(selection);
          // make call to server to fetch nutrition information for given ndbno of currentSelection and add to database
        } else if (this.state.currentSelection === undefined || this.state.currentSelection === 'none of the above') {
          this.setState({currentOffset: this.state.currentOffset + 1},()=> {
            this.getNdbno(ingredient.name);
          })
        }
      }

    }

    finalValidation(ndbno, name){
      const {updateRecipe, index, ...rest} = this.props;
      // this is a terrible way to update state... three calls in a row connected via callbacks
      // perhaps promises could be used, or the 'updateRecipe' function could be refactored to take
      // multiple state changes at once
      updateRecipe(['ingredients', 'name'], name, index, () => 
        updateRecipe(['ingredients', 'ndbno'], ndbno, index, () => 
            updateRecipe(['ingredients', 'isValidated'], true, index)));
    }

    handleSave(){
      const {ingredient, updateRecipe, index, ...rest} = this.props;
      if (ingredient.quantity && ingredient.isValidated) {
        updateRecipe(['ingredients', 'isSaved'], true, index);
      } else {
        alert('please ensure that ingredient is validated and quantity is entered');
      }
    }

    render(){
      const {ingredient, index, deleteItem, ...rest} = this.props;

      return (
        <div className='ingredient-input'>
            <input className='user name' type='text' name='name' placeholder='Ingredient name' 
              onChange={this.handleChange} 
              value={ingredient.name} 
              disabled={ingredient.isValidated}
            />
            <div className='quantity'>
              <input className='user quantity-input' type='number' name='quantity' placeholder='Quantity' 
              onChange={this.handleChange} 
              value={ingredient.quantity} 
              disabled={ingredient.isSaved}
              /> <span>grams</span>
            </div>
            <div className='ingredient-validate' hidden={ingredient.isValidated}>
              <input className='button' type='button' 
                value={this.state.isValidating ? 'Confirm' : 'Validate'} 
                onClick={() => this.validate()}
              />
              <select name="select" className='user select' onChange={this.updateSelection}>
                <option value=''>--Please choose an item to validate--</option>
                  {this.state.nameMatches.map((nameMatch, i) => <option object={nameMatch} value={nameMatch.name} key={i}>{nameMatch.name}</option>)}
                <option value='none of the above'>--None of the above--</option>
              </select>
           </div>
            <input className='button' type='submit' value='Save' 
              disabled={ingredient.isSaved} 
              onClick={this.handleSave}
            />
            <input className='button' type='button' value='Delete' 
              onClick={() => deleteItem('ingredients', index)}
            />
        </div>)
    }
}
export default IngredientInput;