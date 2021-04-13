const db = require('../../lib/db.js');
const {
	getIngredients,
	addIngredients,
	updateIngredients,
} = require('./ingredients-queries');

const getRecipes = (dashboardId) => {
	const text = `
  SELECT *
  FROM recipes
  WHERE dashboard_id = $1
	ORDER BY title;`;
	const values = [dashboardId];

	return db
		.query(text, values)
		.then((res) => res.rows)
		.catch((err) => console.log('Error at recipes queries "getRecipes"', err));
};

const getRecipe = (recipeId) => {
	const text = `
	SELECT *
	FROM recipes
	WHERE id = $1;`;
	const values = [recipeId];

	return db
		.query(text, values)
		.then((recipeRes) => {
			const recipeDetails = recipeRes.rows[0];
			return getIngredients(recipeId).then((ingRes) => {
				recipeDetails.ingredients = ingRes;
				return recipeDetails;
			});
		})
		.catch((err) => console.log('Error at recipes queries "getRecipe"', err));
};

const addRecipe = (dashboardId, { title, directions, time, ingredients }) => {
	const textRecipes = `
	INSERT INTO recipes (dashboard_id, title, directions, time)
	VALUES ($1, $2, $3, $4)
	RETURNING *;`;
	const valuesRecipes = [dashboardId, title, directions, time];

	return db
		.query(textRecipes, valuesRecipes)
		.then((resRecipe) => {
			return addIngredients(resRecipe.rows[0].id, ingredients)
				.then((resIngredients) => {
					return { ...resRecipe.rows[0], ingredients: resIngredients.rows };
				})
				.catch((err) =>
					console.log('Error at recipes queries "addRecipe" (INNER)', err)
				);
		})
		.catch((err) =>
			console.log('Error at recipes queries "addRecipe" (OUTER)', err)
		);
};

const updateRecipe = ({
	id,
	title,
	time,
	img_url,
	directions,
	ingredients,
}) => {
	const text = `
	UPDATE recipes
	SET title = $1, time = $2, img_url = $3, directions = $4
	WHERE id = $5
	RETURNING *;`;
	const values = [title, time, img_url, directions, id];

	return db.query(text, values).then((res) => {
		const updatedRecipe = res.rows[0];
		return updateIngredients(ingredients).then(() => {
			getRecipe(updatedRecipe.id).then((recipe) => recipe);
		});
	});
};

const deleteRecipe = (recipeId) => {
	const text = `
	DELETE FROM recipes
	WHERE id = $1;`;
	const values = [recipeId];

	return db
		.query(text, values)
		.catch((err) =>
			console.log('Error at recipes queries "deleteRecipe"', err)
		);
};

module.exports = {
	getRecipes,
	getRecipe,
	addRecipe,
	deleteRecipe,
	updateRecipe,
};
