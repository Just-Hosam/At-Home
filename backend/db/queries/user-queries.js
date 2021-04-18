const db = require('../../lib/db.js');

const getUsers = (userId) => {
	const text = `
	SELECT *
	FROM users;`;

	return db
		.query(text)
		.then((res) => res.rows)
		.catch((err) => console.log(`Error at users queries 'getUsers'`, err));
};

const getUser = (userId) => {
	const text = `
	SELECT *
	FROM users
	WHERE id = $1;`;
	const values = [userId];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) => console.log(`Error at users queries 'getUser'`, err));
};

const getUserByEmail = (userEmail) => {
	const text = `
	SELECT *
	FROM users
	WHERE email = $1;`;
	const values = [userEmail];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) => console.log(`Error at users queries 'getUser'`, err));
};

const checkUserByEmail = (userEmail, userPassword) => {
	const text = `
	SELECT *
	FROM users
	WHERE email = $1
	AND password = $2;`;
	const values = [userEmail, userPassword];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) =>
			console.log(`Error at users queries 'checkUserByEmail'`, err)
		);
};

const addUser = (userObj) => {
	const text = `
	INSERT INTO users (first_name, last_name, email, password)
	VALUES ($1, $2, $3, $4)
	RETURNING *;`;
	const values = [
		userObj.firstName,
		userObj.lastName,
		userObj.email,
		userObj.password,
	];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) => console.log(`Error at users queries 'addUser'`, err));
};

const updateUser = (userObj) => {
	const text = `
	UPDATE users
	SET first_name = $1, last_name = $2, email = $3, password = $4
	WHERE id = $5
	RETURNING *`;
	const values = [
		userObj.first_name,
		userObj.last_name,
		userObj.email,
		userObj.password,
		userObj.id,
	];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) => console.log(`Error at users queries 'updateUser'`, err));
};

module.exports = {
	getUsers,
	getUser,
	addUser,
	updateUser,
	checkUserByEmail,
	getUserByEmail,
};
