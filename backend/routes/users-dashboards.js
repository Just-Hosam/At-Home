const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getDashboardsPerUser,
	deleteLink,
	createDashboard,
} = require('../db/queries/link-queries');

router.get('/', (req, res) => {
	const userId = req.params.userId;

	getDashboardsPerUser(userId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at users-dashboards GET route "/"', err)
		);
});

router.post('/', (req, res) => {
	const userId = req.params.userId;
	const dashboardObj = req.body.dashboardObj;

	createDashboard(userId, dashboardObj)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at users-dashboards POST route "/"', err)
		);
});

router.delete('/:dashboardId', (req, res) => {
	const userId = req.params.userId;
	const dashboardId = req.params.dashboardId;

	deleteLink(userId, dashboardId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at users-dashboards GET route "/:dashboardId"', err)
		);
});

module.exports = router;
