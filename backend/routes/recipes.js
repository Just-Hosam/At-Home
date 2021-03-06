const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getRecipes,
	getRecipe,
	addRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../db/queries/recipe-queries');

router.get('/', (req, res) => {
	const dashboardId = req.params.dashboardId;

	getRecipes(dashboardId)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at recipes GET route "/"', err));
});

router.get('/:recipeId', (req, res) => {
	const recipeId = req.params.recipeId;

	getRecipe(recipeId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at recipes GET route "/:recipeId"', err)
		);
});

router.post('/', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const recipe = req.body;

	addRecipe(dashboardId, recipe)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at recipes POST route "/"', err));
});

router.patch('/:recipeId', (req, res) => {
	const recipeObj = req.body;

	updateRecipe(recipeObj)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at recipes PATCH route "/:recipeId"', err)
		);
});

router.delete('/:recipeId', (req, res) => {
	const recipeId = req.params.recipeId;

	deleteRecipe(recipeId)
		.then(() => res.send('Deleted'))
		.catch((err) =>
			console.log('Error at recipes DELETE route "/:recipeId"', err)
		);
});

module.exports = router;
