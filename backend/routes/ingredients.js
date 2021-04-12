const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	deleteIngredient,
	addIngredient,
} = require('../db/queries/ingredients-queries');

router.post('/', (req, res) => {
	const recipeId = req.params.recipeId;
	const ingredient = {
		recipe_id: recipeId,
		item: '',
		measurement: '',
	};

	addIngredient(ingredient)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at ingredients POST route "/"', err));
});

router.delete('/:ingredientId', (req, res) => {
	const ingredientId = req.params.ingredientId;

	deleteIngredient(ingredientId)
		.then(() => res.send('Deleted'))
		.catch((err) =>
			console.log('Error at ingredients DELETE route "/:ingredientId"', err)
		);
});

module.exports = router;
