import React from 'react'
import { Grid, Image, Container, Header } from 'semantic-ui-react'
import RecipeSuggestion from './RecipeSuggestion.jsx';

class Ingredient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
    }
  }


  render(){
    return (
  <Grid celled>
    <Grid.Row>
      <Grid.Column width={13}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
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


export default Ingredient

