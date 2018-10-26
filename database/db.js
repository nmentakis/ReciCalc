// Postgress init here
// Schema in separate file?
const env = require('../db_config.js').environment;
const options = require('../knexfile')[env];

const knex = require('knex')(options);

// EXAMPLE DATABASE ACCESS FUNCTION:
//
//module.exports.checkAccess = function(id) {
//  return knex
//     .select('message')
//     .from('sample')
//     .where({id})
//};

module.exports.fetchRecipeList = function() {
  //return a list of short recipe descriptions
};

module.exports.fetchRecipeById = function(recipeId) {
  //return the recipe and all relevant accompanying information
};

module.exports.searchIngredientByName = function(searchString) {
  //look for ingredients that might be the target and return them
};

module.exports.addIngredient = function(ingredient) {
  //takes an ingredient object and stores it to the ingredients table
}

module.exports.addRecipeIngredient = function(recipeIngredient) {
  //takes an ingredient entry on a recipe and adds it to the recipe_ingredient junction table
}

module.exports.addRecipe = function(recipe) {
  //takes a recipe object, adds the basic data to the db, then calls addRecipeIngredient on each 
  //ingredient entry to store the necessary information
}