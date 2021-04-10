const express = require('express');
const router = express.Router({mergeParams: true});
const { getPolls,
				getOptions,
				createPoll,
				createOptions,
				addVote,
				deletePoll,
				deleteOptions
} = require('../db/queries/poll-queries');

//fetch poll details
router.get('/', (req, res) => {
	const values = [req.params.dashboardId];

	getPolls(values)
	.then((pollsData) => res.json(pollsData.rows))
	.catch((err) => console.log('Error at polls GET route "/"', err));
});

//fetch options details
router.get('/options', (req, res) => {
	const values = [req.params.dashboardId];

	getOptions(values)
	.then((pollsData) => res.json(pollsData.rows))
	.catch((err) => console.log('Error at options GET route "/"', err));
});

//create a new poll
router.post('/', (req, res) => {

	const values = [req.params.dashboardId, req.body.input.title, req.body.input.description];

	createPoll(values)
	.then((createdData) => res.json(createdData))
	.catch((err) => console.log('Error at polls CREATE route "/"', err));
});

//create new options
router.post('/options', (req, res) => {

	const values = [req.params.dashboardId, req.body.input.option1, req.body.input.option2,req.body.input.option3];
	
	createOptions(values)
	.then((createdData) => res.json(createdData))
	.catch((err) => console.log('Error at polls CREATE route "/"', err));
});


// add vote to options
router.post('/:optionsId', (req, res) => {

	const values  = [req.params.optionsId, req.params.dashboardId];

	addVote(values)
	.then((voteData) => res.json(voteData))
	.catch((err) => console.log('Error at polls POST route "/"', err));
});


//delete current poll
router.delete('/', (req, res) => { 

	const values  = [req.params.dashboardId];//<----- ADD ADMIN ID PROTECTION

	deletePoll(values)
	.then((voteData) => res.json(voteData))
	.catch((err) => console.log('Error at polls POST route "/"', err));
});

//delete options
router.delete('/options', (req, res) => { 

	const values  = [req.params.dashboardId];//<----- ADD ADMIN ID PROTECTION

	deleteOptions(values)
	.then((voteData) => res.json(voteData))
	.catch((err) => console.log('Error at polls POST route "/"', err));
});

module.exports = router;
