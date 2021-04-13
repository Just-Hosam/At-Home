const db = require('../../lib/db.js');

const getIngredients = (recipeId) => {
	const text = `
  SELECT *
  FROM ingredients
  WHERE recipe_id = $1;`;
	const values = [recipeId];

	return db
		.query(text, values)
		.then((res) => res.rows)
		.catch((err) =>
			console.log('Error at ingredients queries "getIngredients"', err)
		);
};

const addIngredients = (recipeId, ingredients) => {
	const textIngredients = ingredientsInsertQuery(recipeId, ingredients);

	return db
		.query(textIngredients)
		.then((ingRes) => ingRes.rows)
		.catch((err) =>
			console.log('Error at ingredients queries "addIngredients"', err)
		);
};

const deleteIngredient = (ingredientId) => {
	const text = `
	DELETE FROM ingredients
	WHERE id = $1;`;
	const values = [ingredientId];

	return db
		.query(text, values)
		.catch((err) =>
			console.log('Error at ingredients queries "deleteIngredient"', err)
		);
};

const addIngredient = (ingObj) => {
	const text = `
	INSERT INTO ingredients (recipe_id, item, measurement) VALUES
	($1, $2, $3)
	RETURNING *;`;
	const values = [ingObj.recipe_id, ingObj.item, ingObj.measurement];

	return db.query(text, values).then((res) => res);
};

const updateIngredients = (ingArr) => {
	let text = '';
	for (const elem of ingArr) {
		text += `
		UPDATE ingredients
		SET item = '${elem.item}', measurement = '${elem.measurement}'
		WHERE id = ${elem.id};`;
	}

	return db.query(text).then((res) => res);
};

const ingredientsInsertQuery = (recipeId, ingredientsArr) => {
	let query = 'INSERT INTO ingredients (recipe_id, item, measurement) VALUES\n';
	for (const elem of ingredientsArr) {
		query += `(${recipeId}, '${elem.item}', '${elem.measurement}'),\n`;
	}
	query = query.slice(0, query.length - 2);
	query += '\nRETURNING *;';
	return query;
};

module.exports = {
	getIngredients,
	addIngredients,
	deleteIngredient,
	addIngredient,
	updateIngredients,
};
