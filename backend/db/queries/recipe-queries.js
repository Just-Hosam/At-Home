const db = require('../../lib/db.js');

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
	const textRecipe = `
	SELECT *
	FROM recipes
	WHERE id = $1;`;
	const valuesRecipe = [recipeId];

	const textIngredients = `
  SELECT *
  FROM ingredients
  WHERE recipe_id = $1;`;
	const valuesIngredients = [recipeId];

	return Promise.all([
		db.query(textRecipe, valuesRecipe),
		db.query(textIngredients, valuesIngredients),
	])
		.then((resArr) => {
			const recipeDetails = resArr[0].rows[0];
			recipeDetails.ingredients = resArr[1].rows;
			return recipeDetails;
		})
		.catch((err) => console.log('Error at recipes queries "getRecipe"', err));
};

const addRecipe = (dashboardId, { title, description, time, ingredients }) => {
	const textRecipes = `
	INSERT INTO recipes (dashboard_id, title, description, time)
	VALUES ($1, $2, $3, $4)
	RETURNING *;`;
	const valuesRecipes = [dashboardId, title, description, time];

	return db
		.query(textRecipes, valuesRecipes)
		.then((resRecipe) => {
			const textIngredients = ingredientsInsertQuery(ingredients);

			db.query(textIngredients)
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

const ingredientsInsertQuery = (ingredientsArr) => {
	let query = 'INSERT INTO ingredients (recipe_id, item, measurement) VALUES\n';
	for (const elem of ingredientsArr) {
		query += `(${elem.recipe_id}, ${elem.item}, ${elem.measurement}),\n`;
	}
	query += 'RETURNING *;';
	return query;
};

module.exports = {
	getRecipes,
	getRecipe,
	addRecipe,
	deleteRecipe,
};
