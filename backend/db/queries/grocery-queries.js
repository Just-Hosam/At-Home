const db = require('../../lib/db.js');

const getGroceries = (dashboardId) => {
	const text = `
  SELECT * 
  FROM groceries
  WHERE dashboard_id = $1
	ORDER BY id DESC;`;
	const values = [dashboardId];

	return db
		.query(text, values)
		.then((res) => res.rows)
		.catch((err) =>
			console.log('Error at groceries queries "getGroceries"', err)
		);
};

const getGrocery = (dashboardId, groceryId) => {
	const text = `
	SELECT *
	FROM groceries
	WHERE dashboard_id = $1
	AND id = $2;`;
	const values = [dashboardId, groceryId];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) =>
			console.log('Error at groceries queries "getGrocery"', err)
		);
};

const addGrocery = (dashboardId, newGrocery) => {
	const text = `
  INSERT INTO groceries (dashboard_id, text)
	VALUES ($1, $2)
	RETURNING *;`;
	const values = [dashboardId, newGrocery];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) =>
			console.log('Error at groceries queries "addGrocery"', err)
		);
};

const addGroceries = (dashboardId, newGroceries) => {
	let text = `INSERT INTO groceries (dashboard_id, text) VALUES\n`;
	for (const elem of newGroceries) {
		text += `(${dashboardId}, '${elem.item}'),\n`;
	}
	text = text.slice(0, text.length - 2);
	text += '\nRETURNING *;';

	return db.query(text).then((res) => res.rows);
};

const toggleGrocery = (dashboardId, groceryId) => {
	return getGrocery(dashboardId, groceryId)
		.then((res) => {
			const text = `
			UPDATE groceries
			SET done = $1
			WHERE dashboard_id = $2
			AND id = $3;`;
			const values = [!res.done, dashboardId, groceryId];

			return db
				.query(text, values)
				.then((res) => res)
				.catch((err) =>
					console.log('Error at groceries queries "toggleGrocery"', err)
				);
		})
		.catch((err) =>
			console.log('Error at groceries queries "toggleGrocery"', err)
		);
};

module.exports = {
	getGroceries,
	addGrocery,
	toggleGrocery,
	getGrocery,
	addGroceries,
};
