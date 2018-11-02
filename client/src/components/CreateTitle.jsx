import React, {Component} from 'react';

class CreateTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: null,
          isSaved: false
        }
      this.updateTitle = this.updateTitle.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleSaved = this.toggleSaved.bind(this);
    }

    updateTitle(event){
      this.setState({title: event.target.value});
    }

    // when toggled, changes the 'save' button to read 'edit' and disables the input field
    toggleSaved(){
        this.setState(prevState => ({isSaved: !prevState.isSaved}));
    }

    handleSubmit(event){
      event.preventDefault();
      if (this.state.isSaved) {
        this.toggleSaved();
      } else {
        if(this.state.title) {
          this.toggleSaved();
          this.props.updateRecipe(event.target.name, this.state.title);
        }
      }
    }

    render () {
        return (
          <form id='create-title' name='title' onSubmit={this.handleSubmit}>
            <h3>Recipe Title:</h3>
            <input className='user title' type='text' placeholder='Recipe Title Here' onChange={this.updateTitle} disabled={this.state.isSaved}/>
            <input className='button' type='submit' value={this.state.isSaved ? 'Edit' : 'Save'} />
          </form>)
    }
}

export default CreateTitle;