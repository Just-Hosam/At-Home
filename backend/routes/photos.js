const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getPhotos,
	getPhoto,
	addPhoto,
	editPhoto,
} = require('../db/queries/photo-queries');

router.get('/', (req, res) => {
	const dashboardId = req.params.dashboardId;

	getPhotos(dashboardId)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at photos GET route "/"', err));
});

// Used for testing purposes only
router.get('/:photoId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const photoId = req.params.photoId;

	getPhoto(dashboardId, photoId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at photos PATCH route "/:photoId"', err)
		);
});

router.post('/', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const photo = req.body.img_src;

	addPhoto(dashboardId, photo)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at photos POST route "/"', err));
});

router.patch('/:photoId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const photoId = req.params.photoId;

	editPhoto(dashboardId, photoId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at photos PATCH route "/:photoId"', err)
		);
});

module.exports = router;
