const db = require('../../lib/db.js');

const getEvents = values => {
	const text = `
	SELECT * FROM events 
	WHERE dashboard_id = $1;`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at events queries "getEvents"', err));
};

const createEvent = values => {
	
	const text = `
	INSERT INTO events (dashboard_id, title, description, start_at, end_at)
	VALUES($1,$2,$3,$4,$5);`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at events queries "createEvent"', err));
};

const editEvent = values => {
	const text = `
	UPDATE events 
	SET title = $3, description = $4,  start_at = $5, end_at = $6
	WHERE dashboard_id = $2
	AND events.id = $1;
	`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at events queries "editEvent"', err));
};


const deleteEvent = values => { //<----- ADD ADMIN ID PROTECTION

	const text = `
	DELETE FROM events 
	WHERE dashboard_id = $1
	AND events.id = $2;`;

	return db.query(text,values)
	.then((res) => res)
	.catch((err) =>
	console.log('Error at polls queries "deleteEvent"', err));
};

module.exports = {
	getEvents,
	createEvent,
	editEvent,
	deleteEvent,
};
