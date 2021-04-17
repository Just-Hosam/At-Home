const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getUsersPerDashboard,
	deleteLink,
	createLink,
	toggleAdmin,
} = require('../db/queries/link-queries');

router.get('/', (req, res) => {
	const dashboardId = req.params.dashboardId;

	getUsersPerDashboard(dashboardId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at dashbooards-users GET route "/"', err)
		);
});

router.patch('/:userId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const userId = req.params.userId;
	const userStatus = req.body.userAdminStatus;

	toggleAdmin(userId, userStatus, dashboardId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at dashbooards-users PATCH route "/:userId"', err)
		);
});

router.post('/', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const userEmail = req.body.userEmail;

	createLink(userEmail, dashboardId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at dashbooards-users POST route "/"', err)
		);
});

router.delete('/:userId', (req, res) => {
	const userId = req.params.userId;
	const dashboardId = req.params.dashboardId;

	deleteLink(userId, dashboardId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at dashbooards-users DELETE route "/"', err)
		);
});

module.exports = router;
