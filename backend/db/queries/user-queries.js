const db = require('../../lib/db.js');

const getUsers = () => {
	const text = `SELECT * FROM users;`;

	return db.query(text);
};

module.exports = {
	getUsers,
};
