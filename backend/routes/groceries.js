const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getGroceries,
	addGrocery,
	toggleGrocery,
	getGrocery,
	addGroceries,
} = require('../db/queries/grocery-queries');

router.get('/', (req, res) => {
	const dashboardId = req.params.dashboardId;

	getGroceries(dashboardId)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at groceries GET route "/"', err));
});

// Used for testing purposes only
router.get('/:groceryId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const groceryId = req.params.groceryId;

	getGrocery(dashboardId, groceryId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at groceries PATCH route "/:groceryId"', err)
		);
});

router.post('/', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const grocery = req.body.inputGrocery;

	if (Array.isArray(grocery)) {
		addGroceries(dashboardId, grocery).then((data) => res.json(data));
	} else {
		addGrocery(dashboardId, grocery)
			.then((data) => res.json(data))
			.catch((err) => console.log('Error at groceries POST route "/"', err));
	}
});

router.patch('/:groceryId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const groceryId = req.params.groceryId;

	toggleGrocery(dashboardId, groceryId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at groceries PATCH route "/:groceryId"', err)
		);
});

module.exports = router;
