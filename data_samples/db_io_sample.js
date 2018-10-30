databaseRecipeOutput = [ 
  [ 
    { 
      id: 1,
      name: 'test recipe A',
      description: null,
      top_ingredients: null,
      instructions: null,
      created_at: null,
      updated_at: null 
    } 
  ],
  [ 
    { quantity: null,
      position: null,
      ndbno: 1,
      name: 'test ingredient A1',
      stdAmount: '100.00',
      kcalPer: null,
      fatPer: null,
      satFatPer: null,
      fiberPer: null,
      cholesterolPer: null,
      sodiumPer: null,
      carbsPer: null,
      sugarPer: null,
      proteinPer: null 
    },  
    { 
      quantity: null,
      position: null,
      ndbno: 3,
      name: 'test ingredient A2',
      stdAmount: '100.00',
      kcalPer: null,
      fatPer: null,
      satFatPer: null,
      fiberPer: null,
      cholesterolPer: null,
      sodiumPer: null,
      carbsPer: null,
      sugarPer: null,
      proteinPer: null 
    } 
  ] 
];

databaseIngredientsOutput = [ 
  { 
    ndbno: 7028,
    name: 'Ham, sliced, pre-packaged, deli meat (96%fat free, water added)',
    std_amount: '100.00',
    std_measure: 'g',
    kcal_per: '107.00',
    fat_per: '4.04',
    sat_fat_per: '1.23',
    fiber_per: '0.00',
    cholesterol_per: '41.00',
    sodium_per: '945.00',
    carbs_per: '0.70',
    sugar_per: null,
    protein_per: '16.85' 
  }
  //there could be more objects down here, it's an array 
];
