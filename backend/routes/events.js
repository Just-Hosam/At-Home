const express = require('express');
const router = express.Router({mergeParams: true});
const { getEvents,
				createEvent,
				editEvent,
				deleteEvent,
} = require('../db/queries/events-queries');


	router.get('/', (req, res) => {
		const values = [req.params.dashboardId];

	getEvents(values)
	.then((eventsData) => res.json(eventsData.rows))
	.catch((err) => console.log('Error at events GET route "/"', err));
});


router.post('/', (req, res) => {

	const values = [
	req.params.dashboardId, 
	req.body.newEvent.title, 
	req.body.newEvent.description,
	req.body.newEvent.from, 
	req.body.newEvent.to, 
	];

	createEvent(values)
	.then((createdData) => res.json(createdData))
	.catch((err) => console.log('Error at events CREATE route "/"', err));
});

router.patch('/edit', (req, res) => {

	const values = [
	req.body.editedEvent.id, 
	req.params.dashboardId, 
	
	req.body.editedEvent.title, 
	req.body.editedEvent.description,
	req.body.editedEvent.from, 
	req.body.editedEvent.to, 
	];

	editEvent(values)
	.then((editedData) => res.json(editedData))
	.catch((err) => console.log('Error at events EDIT route "/"', err));
});


router.delete('/:eventId', (req, res) => { //< ---ADD ADMIN PROTECTION
	const values = [
	req.params.dashboardId, 
	req.params.eventId, 
	];

	deleteEvent(values)
	.then((deletedData) => res.json(deletedData))
	.catch((err) => console.log('Error at events DELETE route "/"', err));
});

module.exports = router;
