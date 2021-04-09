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
const addPhoto = (dashboardId, imgUrl, imgText) => {
	const text = `
  INSERT INTO photos (dashboard_id, img_url, text)
	VALUES ($1, $2, $3)
	RETURNING *;`;
	const values = [dashboardId, imgUrl, imgText];

	return db
		.query(text, values)
		.then((res) => res)
		.catch((err) =>
			console.log('Error at photos queries "addPhoto"', err)
		);
};

const editPhoto = (dashboardId, imgUrl, imgText, photoId) => {
	return getPhoto(dashboardId, photoId)
		.then((res) => {
			const text = `
			UPDATE photos
			SET img_url = $2 AND text = $3
			WHERE dashboard_id = $1
			AND id = $4;`;
			const values = [dashboardID, imgUrl, imgText, photoId];

			return db
				.query(text, values)
				.then((res) => res)
				.catch((err) =>
					console.log('Error at photos queries "editPhoto"', err)
				);
		})
		.catch((err) =>
			console.log('Error at photos queries "editPhoto"', err)
		);
};

module.exports = {
	getPhotos,
	getPhoto,
	addPhoto,
	editPhoto,
};
