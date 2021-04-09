const express = require('express');
const router = express.Router();
const { getUsers } = require('../db/queries/user-queries');

// use bcrypt to hash passwords (we might have to add the other bcrypt for nolan)
// const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	getUsers().then((usersData) => {
		res.json(usersData.rows);
	});
});

module.exports = router;
