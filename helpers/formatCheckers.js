const isValidNdbno = (item) => {
  if (typeof item === 'number') {
    item = item.toString().padStart(5, '0');
  }
  if (typeof item !== 'string') {
    return false;
  }
  if (item.length !== 5) {
    return false;
  }
  for(let i = 0; i < item.length; i++) {
    if (isNaN(item[i])) {
      return false;
    }
  }
  return true;
};

const isValidIngredientList = (ingredients) => {
  return ingredients.every(ing => {
    if(isValidNdbno(ing.ndbno) === false) {
      return false;
    }
    if(isNaN(ing.quantity)) {
      return false;
    }
    return true;
  });
} 

const isValidRecipe = (recipe) => {
  if (typeof recipe !== 'object') {
    return false;
  }
  if (typeof recipe.title !== 'string') {
    return false;
  }
  if (Array.isArray(recipe.instructions) === false) {
    return false;
  }
  if (Array.isArray(recipe.ingredients) === false) {
    return false;
  }
  if (isValidIngredientList(recipe.ingredients) === false) {
      return false;
  }
  return true;
};

module.exports.isValidRecipe = isValidRecipe;
module.exports.isValidNdbno = isValidNdbno;