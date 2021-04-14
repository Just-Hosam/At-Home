const express = require('express');
const router = express.Router();
const {
	getUsers,
	getUser,
	updateUser,
	addUser,
} = require('../db/queries/user-queries');

router.get('/', (req, res) => {
	getUsers()
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at users GET route "/"', err));
});

router.get('/:userId', (req, res) => {
	const userId = req.params.userId;

	getUser(userId)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at users GET route "/:userId"', err));
});

router.post('/', (req, res) => {
	const userObj = req.body.userObj;

	addUser(userObj)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at users POST route "/"', err));
});

router.patch('/:userId', (req, res) => {
	const userObj = req.body.userObj;

	updateUser(userObj)
		.then((data) => res.json(data))
		.catch((err) => console.log('Error at users PATCH route "/:userId"', err));
});

module.exports = router;
