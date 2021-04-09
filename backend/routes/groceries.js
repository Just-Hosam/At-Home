const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getGroceries,
	addGrocery,
	toggleGrocery,
	getGrocery,
} = require('../db/grocery-queries');

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

	addGrocery(dashboardId, grocery)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at groceries POST route "/"', err));
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
