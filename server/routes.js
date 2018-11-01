const router = require('express').Router();
const controller = require('./controller.js');


router.post('/signup', controller.signup.addUser);
router.post('/login', controller.login.loginUser);

router.get('/recipes', controller.recipes.getList);
router.get('/recipes/:recipeId', controller.recipes.getOne);
router.post('/recipes', controller.recipes.post);

router.get('/ingredients', controller.ingredients.getDbByName);
router.get('/ingredients/usda', controller.ingredients.getUsdaByName);
router.get('/ingredients/usda/:ndbno', controller.ingredients.getUsdaIngredientInfo);
router.post('/ingredients', controller.ingredients.post);

router.post('/signup', controller.auth.signupUser);
router.post('/login', controller.auth.login);
router.get('/logout', controller.auth.logout);
module.exports = router;