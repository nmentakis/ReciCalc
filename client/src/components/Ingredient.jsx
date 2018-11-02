import React from 'react'
import { Grid, Image, Container, Header } from 'semantic-ui-react'
import RecipeSuggestion from './RecipeSuggestion.jsx';
import { withFormik, Form, Field } from 'formik';

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
        <Form>
          <Field
            type="text"
            name="name"
            placeholder="Ingredient Name"
                />
        </Form>
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


const FormikIngredient = withFormik({
  
  mapPropsToValues({ name, password, history, setUser }) {
    return {
      name: name || '',

    };
  },
  handleSubmit(values) {
    console.log(values)
  },
})(Ingredient);


export default FormikIngredient;