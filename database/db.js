const env = require('../db_config.js').environment;
const options = require('../knexfile')[env];
const parse = require('../helpers/parsers.js');
const knex = require('knex')(options);
const bcrypt = require('bcrypt');

// EXAMPLE DATABASE ACCESS FUNCTION:
//
//module.exports.checkAccess = function(id) {
//  return knex
//     .select()
//     .from('sample')
//    // .where({id})
//};
module.exports.deleteOneById = (recipeId) => {
  const id = recipeId;
  let recipeIngredient = knex('recipe_ingredients').where({recipe_id: id}).del();
  let recipes = knex('recipes').where({id}).del();
  return Promise.all([recipeIngredient, recipes]).then(data => data);
}
module.exports.fetchRecipeList = function() {
  //return a list of short recipe descriptions
  return knex.select().from('recipes');
};


module.exports.fetchRecipeById = function(recipeId) {
  //return the recipe and all relevant accompanying information
  
  const queriesNeeded = [
    knex.select('*').from('recipes').where({id: recipeId}),
    // knex.select({
    //     quantity: 'ingredients.quantity',
    //     // position: 'recipe_ingredients.list_position',
    //     ndbno: 'ingredients.ndbno',
    //     name: 'ingredients.name',
    //     stdAmount: 'ingredients.std_amount',
    //     kcalPer: 'ingredients.kcal_per',
    //     fatPer: 'ingredients.fat_per',
    //     satFatPer: 'ingredients.sat_fat_per',
    //     fiberPer: 'ingredients.fiber_per',
    //     cholesterolPer: 'ingredients.cholesterol_per',
    //     sodiumPer: 'ingredients.sodium_per',
    //     carbsPer: 'ingredients.carbs_per',
    //     sugarPer: 'ingredients.sugar_per',
    //     proteinPer: 'ingredients.protein_per'
    //   })
    //   .from('ingredients')
      // .join('ingredients', 'recipe_ingredients.food_no', '=', 'ingredients.ndbno')
      // .where({'recipe_ingredients.recipe_id': recipeId})
      // .orderBy('recipe_ingredients.list_position', 'asc')
  ]; 
  return Promise
    .all(queriesNeeded)
    .then(data => {
      if(data) {
        return (data);
      } else {
        return {status: 'No Such Recipe'};
      }
    });
};

// old version - very very stupid, but it works for sure
//module.exports.searchIngredientsByName = function(searchString) {
//  //look for ingredients that might be the target and return them
//  return knex.select('*')
//    .from('ingredients')
//    .where('name', 'ilike', '%'+searchString+'%');
//};

module.exports.searchIngredientsByName = function(searchString) {
  const strings = searchString.trim().split(' ').map(string => string ? '%' + string + '%' : '');
  let allSearch = knex.select('*')
    .from('ingredients')
    .where('name', 'ilike', strings[0]);
  for (let i = 1; i < strings.length; i++) {
    if (strings[i]) {
      allSearch = allSearch.andWhere('name', 'ilike', strings[i]);
    }
  }
  let anySearch = knex.select('*')
    .from('ingredients')
    .where('name', 'ilike', strings[0])
  for (let i = 1; i < strings.length; i++) {
    if (strings[i]) {
      anySearch = anySearch.orWhere('name', 'ilike', strings[i]);
    }
  }
  return Promise.all([allSearch, anySearch])
    .then( ([allSearch, anySearch]) => {
      anySearch = anySearch.filter(anyIng => {
        let isUniqueIngredient = true;
        allSearch.forEach(allIng => {
          if (anyIng.ndbno === allIng.ndbno) {
            isUniqueIngredient = false;
          }
        });
        return isUniqueIngredient;
      });
      return allSearch.concat(anySearch);
    })
}

module.exports.addIngredient = function(usdaIngredient) {
  //takes an ingredient object and stores it to the ingredients table
  //Assuming object is the usda return object's report.foods[0]
  let dbIngredient = parse.usdaIngredientToDatabase(usdaIngredient);
  return knex('ingredients')
    .insert(dbIngredient)
    .catch(err => {
      if(err.code === '23505') {
        //duplicate item, not actually a problem
        return;
      } else {
        throw err;
      }
    });
}

module.exports.addRecipeIngredient = function(recipeIngredient) {
  //takes an ingredient entry on a recipe and adds it to the recipe_ingredient junction table
  //might be useful for future recipe editing, not used as of right now
}

module.exports.addRecipe = function(clientRecipe) {
  //takes a recipe object, adds the basic data to the db, then adds recipe ingredients
  console.log('db saving recipe', clientRecipe ); 
  let outerRecipeId = '';
  return knex.transaction(trx => {
    const dbRecipe = {
      name: clientRecipe.title,
      description: clientRecipe.description,
      top_ingredients: clientRecipe.topIngredients,
      ingredients: JSON.stringify(clientRecipe.ingredients),
      instructions: JSON.stringify(clientRecipe.instructions),
      user_id: clientRecipe.userId,
    };
    const dbIngredientJunction = clientRecipe.ingredients.map((ing, index) =>  {
      return {
        food_no: parseInt(ing.ndbno),
        quantity: parseFloat(ing.quantity),
        quantity_measure: 'g',
        list_position: index
      }
    })

    return trx
      .insert(dbRecipe)
      .into('recipes')
      // .returning('id')
      // .then(recipeId => {
      //   outerRecipeId = recipeId[0];
      //   //console.log('recipe ID: ', recipeId)
      //   dbIngredientJunction.forEach(entry => {
      //     entry.recipe_id = recipeId[0]
      //   })
      //   return trx
      //     .insert(dbIngredientJunction)
      //     .into('recipe_ingredients');
      // })
      // .then(() => outerRecipeId);
  })
}

module.exports.findUser = (username, cb) => {
  console.log('Inputed username: ',username)
  knex.select('*')
  .from('users')
  .where({username})
  .then((user) =>{
    cb(null, user)
  })
  .catch(err => {
    console.log('no users found ')
    cb(err, null)
  })
}

module.exports.findUserJWT = (username, password, cb) => {
  console.log('Inputed username: ',username)
  knex.select('*')
  .from('users')
  .where({username})
  .then((user) =>{
    cb(null, user)
  })
  .catch(err => {
    console.log('no users found ')
    cb(err, null)
  })
}
module.exports.changeUsername = (username, newUsername, cb) =>{
  console.log('newUsername: ', newUsername);
  knex('users')
  .where({username})
  .update({username: newUsername})
  .then((res) =>{
    cb(null, res)
  })
  .catch(err => {cb(err,null)})

}
module.exports.changePassword = (username, newPassword, cb) =>{
  console.log('newUsername: ', newPassword);
  bcrypt.hash(newPassword, 10, (err, hash)=>{
    knex('users')
    .where({username})
    .update({password: hash})
    .then((res) =>{
      cb(res)
    })
  })

}
