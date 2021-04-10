const db = require('../../lib/db.js');

const getPolls = values => {

	const text = `
	SELECT title, description
	FROM polls 
	WHERE dashboard_id = $1`;

	return db.query(text,values);
};


const getOptions = values => {

	const text = `
	SELECT * 
	FROM options 
	WHERE poll_id = $1 
	ORDER BY votes DESC;`;

	return db.query(text,values);
};

const createPoll = values => {

		const text = `
	INSERT INTO polls (dashboard_id, title, description) 
	VALUES($1,$2,$3);`;

	return db.query(text,values);
}

const createOptions = values => {

	const text = `
	INSERT INTO options (poll_id, choice, votes) 
	VALUES ($1,$2, 0);`;

	return db.query(text,values);
}


const addVote = values => {

	const text = `
	UPDATE options  
	SET votes = votes + 1 
	WHERE options.id = $1 AND poll_id = $2;`;

	return db.query(text,values);
};

const deletePoll = values => { //<----- ADD ADMIN ID PROTECTION
console.log("VALUES", values);
	const text = `
	DELETE FROM polls 
	WHERE dashboard_id = $1;`;

	return db.query(text,values);
};

const deleteOptions = values => { //<----- ADD ADMIN ID PROTECTION
console.log("VALUES", values);
	const text = `
	DELETE FROM options 
	WHERE poll_id = $1;`;

	return db.query(text,values);
};

module.exports = {
	getPolls,
	getOptions,
	addVote,
	deletePoll,
	deleteOptions,
};