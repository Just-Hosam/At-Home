const db = require('../../lib/db.js');

const getPolls = values => {

	const text = `
	SELECT title, description
	FROM polls 
	WHERE dashboard_id = $1`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at polls queries "getPolls"', err));
};

const getOptions = values => {

	const text = `
	SELECT * 
	FROM options 
	WHERE poll_id = $1 
	ORDER BY votes DESC;`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at polls queries "getOptions"', err));
};

const createPoll = values => {
		const text = `
	INSERT INTO polls (dashboard_id, title, description) 
	VALUES($1,$2,$3);`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at polls queries "createPoll"', err));
};

const createOptions = values => {
	const text = `
	INSERT INTO options (poll_id, choice, votes) 
	VALUES ($1,$2,0),($1,$3,0),($1,$4,0);`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at polls queries "createOptions"', err));
};


const addVote = values => {

	const text = `
	UPDATE options  
	SET votes = votes + 1 
	WHERE options.id = $1 
	AND poll_id = $2;`;

	return db.query(text,values)
	.then((res) => res.rows)
	.catch((err) =>
	console.log('Error at polls queries "addVote"', err));
};

const deletePoll = values => { //<----- ADD ADMIN ID PROTECTION

	const text = `
	DELETE FROM polls 
	WHERE dashboard_id = $1;`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at polls queries "deletePoll"', err));
};

const deleteOptions = values => { //<----- ADD ADMIN ID PROTECTION

	const text = `
	DELETE FROM options 
	WHERE poll_id = $1;`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at polls queries "deleteOptions"', err));
};

module.exports = {
	getPolls,
	getOptions,
	createPoll,
	createOptions,
	addVote,
	deletePoll,
	deleteOptions,
};