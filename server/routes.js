const router = require('express').Router();
const controller = require('./controller.js');


router.get('/recipes', controller.recipes.getList)
router.get('/recipes/:recipeId', controller.recipes.getOne)
router.post('/recipes', controller.recipes.post)

router.get('/ingredients', controller.ingredients.getDbByName)
router.get('/ingredients/usda', controller.ingredients.getUsdaByName)
router.get('/ingredients/usda/:ndbno', controller.ingredients.getUsdaIngredientInfo)
router.post('/ingredients', controller.ingredients.post)


module.exports = router;