const db = require('../../lib/db.js');

const getPhotos = (dashboardId) => {
	const text = `
  SELECT * 
  FROM photos
  WHERE dashboard_id = $1;`;
	const values = [dashboardId];

	return db
		.query(text, values)
		.then((res) => res.rows)
		.catch((err) =>
			console.log('Error at photos queries "getPhotos"', err)
		);
};

const getPhoto = (dashboardId, photoId) => {
	const text = `
	SELECT *
	FROM photos
	WHERE dashboard_id = $1
	AND id = $2;`;
	const values = [dashboardId, photoId];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) =>
			console.log('Error at photos queries "getPhoto"', err)
		);
};

// might change depending on how react behaves
const addGrocery = (dashboardId, newGrocery) => {
	const text = `
  INSERT INTO groceries (dashboard_id, text)
	VALUES ($1, $2);`;
	const values = [dashboardId, newGrocery];

	return db
		.query(text, values)
		.then((res) => res)
		.catch((err) =>
			console.log('Error at groceries queries "addGrocery"', err)
		);
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
	getPhotos,
	getPhoto,
	addGrocery,
	toggleGrocery,
};
