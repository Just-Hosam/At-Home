const db = require('../lib/db.js');

const getPolls = values => {
	console.log("POLLS",values);

	const text = `SELECT title, description, choice, votes 
	FROM polls 
	JOIN options 
	ON poll_id = polls.id 
	WHERE dashboard_id = $1;`;

	return db.query(text,values);
};

module.exports = {
	getPolls,
};