import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const Ingredient = (props) => (
  <Grid celled='internally'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default Ingredient

