// used to translate incoming USDA nutrition information
// to database names
const numberToNutDbName = {
  '208': 'kcal_per',
  '204': 'fat_per',
  '606': 'sat_fat_per',
  '291': 'fiber_per',
  '203': 'protein_per',
  '307': 'sodium_per',
  '601': 'cholesterol_per',
  '269': 'sugar_per',
  '205': 'carbs_per'
}; 

module.exports.usdaIngredientToDatabase = function(usdaIngredient) {
  //expects, for example, the nutrient report.foods[0]
  const dbIngredient = {
    name: usdaIngredient.name,
    ndbno: parseInt(usdaIngredient.ndbno),
    std_amount: 100.00,
    std_measure: 'g',
  }
  usdaIngredient.nutrients.forEach(nut => {
    let name = numberToNutDbName[nut.nutrient_id]
    if(name && typeof nut.gm === 'number') {
      dbIngredient[name] = nut.gm;
    }
  });
  return dbIngredient;
}

module.exports.databaseFullRecipeToClient = function(dbOutput) {
  const fullRecipe = {
    title: dbOutput[0][0].name,
    id: dbOutput[0][0].id,
    description: dbOutput[0][0].description,
    topIngredients: dbOutput[0][0].top_ingredients,
    instructions: dbOutput[0][0].instructions
  }
  fullRecipe.ingredients = dbOutput[1].map(dbIng => {
    const ingredient = {
      name: dbIng.name,
      ndbno: dbIng.ndbno,
      quantity: parseFloat(dbIng.quantity),
      position: dbIng.position,
      nutrition: {
        kcalPer: dbIng.kcalPer,
        fatPer: dbIng.fatPer,
        satFatPer: dbIng.satFatPer,
        fiberPer: dbIng.fiberPer,
        cholesterolPer: dbIng.cholesterolPer,
        sodiumPer: dbIng.sodiumPer,
        carbsPer: dbIng.carbsPer,
        sugarPer: dbIng.sugarPer,
        proteinPer: dbIng.proteinPer
      }
    }
    return ingredient;
  }) 
  return fullRecipe;
}