const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getChores,
	getChore,
	addChore,
	editChore,
	deleteChore,
} = require('../db/queries/chore-queries');

router.get('/', (req, res) => {
	const dashboardId = req.params.dashboardId;

	getChores(dashboardId)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at chores GET route "/"', err));
});

router.get('/:choreId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const choreId = req.params.choreId;

	getChore(dashboardId, choreId)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at chores GET route "/:choreId"', err)
		);
});

router.post('/', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const choreText = req.body.text;
	const assignedName = req.body.name;
	
	addChore(dashboardId, choreText, assignedName)
	.then((data) => res.json(data))
	.catch((err) => console.log('Error at chores POST route "/"', err));
});

router.patch('/:choreId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const choreId = req.params.choreId;
	const choreText = req.body.text;
	const assignedName = req.body.name;
	const choreDone = req.body.done;

	editChore(dashboardId, choreId, choreText, assignedName, choreDone)
		.then((data) => res.json(data))
		.catch((err) =>
			console.log('Error at chores PATCH route "/:choreId"', err)
		);
});

router.delete('/:choreId', (req, res) => {
	const dashboardId = req.params.dashboardId;
	const choreId = req.params.choreId;

	deleteChore(dashboardId, choreId)
		.then((data) => res.json(data))
		.catch((err) => console.log(`Error at chores DELETE route /${choreId}`, err));
});

module.exports = router;
