module.exports.clientRecipeListInput = {
  recipes: [
    {
      title: 'Recipe One Name',
      id: 1,
      description: 'string describing recipe one',
      topIngredients: 'Education, sample data'
    },
    {
      title: 'Recipe Two Name',
      id: 2,
      description: 'string describing recipe two',
      topIngredients: 'These may be hard to generate well'
    }
  ]
};

module.exports.clientFullRecipeInput = {
  title: 'Recipe One Name',
  id: 1,
  description: 'string describing recipe one',
  topIngredients: 'Education, sample data',
  ingredients: [
    {
      name: 'Education',
      ndbno: 101,
      quantity: 100,
      nutrition: {/*probably all the database stored nutrients in format 'nutnamePer: number'*/}
    },
    {
      name: 'Sample data',
      ndbno: 1128,
      quantity: 9,
      nutrition: {/*more nutrition info*/}
    }
  ],
  instructions: ['instruction 1', 'instruction 2']
};

module.exports.clientDbFoundIngredientsInput = {
  dbFound: [ 
    {
      name: 'Education',
      ndbno: 101,
      nutrition: {/*nutrition info*/}
    },
    {
      name: 'Sample data',
      ndbno: 1128,
      nutrition: {/*more nutrition info*/}
    }
  ]
};

module.exports.clientUsdaFoundIngredientsInput = {
  usdaFound: [
    {
      name: 'Education',
      ndbno: 101
    },
    {
      name: 'Sample data',
      ndbno: 1128
    }
  ]
};

module.exports.clientCompletedRecipeOutput = {
  title: 'Recipe name',
  description: 'Description of recipe',
  topIngredients: 'May not have this one',
  ingredients: [
    {
      name: 'Education',
      ndbno: 101,
      quantity: 100
    },
    {
      name: 'Sample data',
      ndbno: 1128,
      quantity: 9
    }
  ],
  instructions: ['Instruction number one', 'Instruction number two']
};