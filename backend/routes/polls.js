const express = require('express');
const router = express.Router({mergeParams: true});
const { getPolls } = require('../db/poll-queries');

router.get('/', (req, res) => {
	const values = [req.params.dashboardId];
	getPolls(values).then((pollsData) => {
		console.log(pollsData.rows);
		res.json(pollsData.rows);
	});
});

module.exports = router;
