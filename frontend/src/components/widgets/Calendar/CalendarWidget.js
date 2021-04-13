import React, { useState, useEffect } from 'react';
import Calendar from 'react-awesome-calendar';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  container: {
		display: 'flex',
		justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  textField: {
		
    marginTop: theme.spacing(1),
    width: '50%',
	},
	
	dialogTitle: {
		color: 'black',
		fontSize: '2rem',
	},

	dialogBody: {
		color: 'black',
		fontSize: '1rem',
	},

	dialogFoot: {
		color: 'grey',
		fontSize: '0.7rem',
	},

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//COMPONENT STARTS
const CalendarWidget = (props) => {

//modal styling
const classes = useStyles();

const dash_id = 1; // <-------- TEMP. DASHBOARD_ID FOR TESTING

const [e, setEvents] = useState({
		events: [],
		details: {
			title: '',
			description: '',
			from: '',
			to: ''
		}
});
const [input, setInput] = useState({
	title: '',
	description: '',
	from: '',
	to: '',
});
const [open, setOpen] = React.useState({

	inputDialog: false,
	editDialog: false,
	viewDialog: false
});


//  fetch events data on inital render
  useEffect(() => {
		
    Promise.all([
			axios.get(`/dashboards/${dash_id}/events`)
    ]).then((e) => {
		
		// Necessary because of naming conflics between the calendar component and SQL, for example the object key 'from' is need for the calendar to render but cannot be used in a SQL query.
		const parsedEvents = e[0].data.map(event => {
			return (
		{id: event.id,
		color: '#06aff5',
		from: event.start_at,
		to: event.end_at,
		title: event.title,
		description: event.description}
			)
		}) 


      setEvents((prev) => ({
        ...prev,
        events: parsedEvents,
				details: {}
      }));
     
    });
  }, []);



const renderWidget = () =>{
	 Promise.all([
			axios.get(`/dashboards/${dash_id}/events`)
    ]).then((e) => {
		
		const parsedEvents = e[0].data.map(event => {
			return (
		{id: event.id,
		color: '#06aff5',
		from: event.start_at,
		to: event.end_at,
		title: event.title,
		description: event.description}
			)
		}) 


      setEvents((prev) => ({
        ...prev,
        events: parsedEvents,
				details: {}
      }));
     
    });
}


//create event
const createEvent = newEvent => {

	axios.post(`/dashboards/${dash_id}/events`, {newEvent})	
  .then((res) => {
	
	renderWidget();

			setOpen({
				inputDialog: false
			});

  }).catch(err => console.log(err));
};


//edit event
const editEvent = editedEvent => {

	axios.patch(`/dashboards/${dash_id}/events/edit`, {editedEvent})	
  .then((res) => {

	renderWidget();

			setOpen({
				inputDialog: false
			});

  }).catch(err => console.log(err));
}



//delete event
const deleteEvent = () => {

	const confirmation = window.confirm("Are you sure you want to delete this event?\nThis action cannot be undone.");

	if(!confirmation) {
		return closeDialog();
	}

	axios.delete(`/dashboards/${dash_id}/events/${e.details.id}`)	
  .then((res) => {
	
	renderWidget();

			setOpen({
				viewDialog: false
			});

		
  }).catch(err => console.log(err));
}



//DIALOG

const handleClickOpen = event => {
	setOpen({
		inputDialog: true
	});
	const from = parseIncomingDate(event);
	setInput({
		from: from
	})
};

const parseIncomingDate = event => {

	const month = event.month + 1;
	const monthStr = month < 10 ? `0${month}` : month;
	const day = event.day < 10 ? `0${event.day}` : event.day;
	const hour = Math.floor(event.hour)
	const hourStr = hour < 10 ? `0${hour}` : hour;
	const parsedDate = `${event.year}-${monthStr}-${day}T${hourStr}:00:00+00:00`;

	return parsedDate;

};


const saveEvent = () => {

	if(!input){
		return closeDialog();
	}
	
	const id = e.events.length < 1 ? 1 : e.events.length + 1;
	const to = input.to ? `${input.to}T00:00:00+00:00` : input.from;

	const newEvent = {
		id: id,
		color: '#06aff5',
		from: input.from,
		to: to,
		title: input.title,
		description: input.description
	}

	createEvent(newEvent);
};


const openEdit = () => {

	setInput({
	title: e.details.title,
	description: e.details.description,
	})
	
	setOpen({
			editDialog: true
		});

};

const saveEdit = () => {
	
	if(!input) {
		return alert("Missing Required Field");
	}

	let from = input.from ? input.from : e.details.from;
	let to = input.to ? input.to : e.details.to;
	from = `${from}T00:00:00+00:00`;
	to = `${to}T00:00:00+00:00`;

	const editedEvent = {
		id: e.details.id,
		color: '#06aff5',
		from: from,
		to: to,
		title: input.title,
		description: input.description
	}

 editEvent(editedEvent);

}


//VIEW EVENT DETAILS

const fetchEventDetails = id => {

	for (const event of e.events) {
		if (event.id === id){

			const eventDetails = {
				id: event.id,
				title: event.title,
				description: event.description,
				from: event.from.substr(0, 10),
				to: event.to.substr(0, 10)
			}

			return eventDetails; 
		}
	}

}

const openEventDialog = id => {

const eventDetails = fetchEventDetails(id);

	setEvents((prev) => ({
		...prev,
		events: [...e.events],
		details: eventDetails
	}));

	setOpen({
		viewDialog: true
	});
};


//closes all dialogs and updates state
const closeDialog = () => {
	setOpen({
		inputDialog: false,
		editDialog: false,
		viewDialog: false
	});

	setInput({
		title: '',
		description: '',
		from: '',
		to: '',
	})

	setEvents((prev) => ({
		...prev,
		events: [...e.events],
		// details: {}
	}));
}


	return (
	
<section className='calendar-class'>

	<Calendar 
	events={e.events}
	onClickEvent={(event) => openEventDialog(event)}
	onClickTimeLine={(event) => handleClickOpen(event)}
	/>


			<Dialog open={open.inputDialog ? open.inputDialog : false}  
			onClose={closeDialog}
			aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Simply enter your event details and save.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
						fullWidth
						value={input.title ? input.title : ''}
						onChange={(event) => setInput((prev) => ({
						...prev,
						title: event.target.value
						}))}
          />
					<TextField
            
            margin="dense"
            id="description"
            label="Description"
            type="text"
						fullWidth
						value={input.description ? input.description : ''}
						onChange={(event) => setInput((prev) => ({
						...prev,
						description: event.target.value
						}))}
          />

				<form className={classes.container} noValidate>
							<TextField
								id="date"
								label="End Date"
								type="date"
								value={input.to ? input.to : ''}
								onChange={(event) => setInput((prev) => ({
								...prev,
								to: event.target.value
								}))}

								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
				</form>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEvent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


			<Dialog open={open.editDialog ? open.editDialog : false}  
			onClose={closeDialog}
			aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Simply edit your event details and save.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
						fullWidth
						value={input.title ? input.title : ''}
						onChange={(event) => setInput((prev) => ({
						...prev,
						title: event.target.value
						}))}
          />
					<TextField
            
            margin="dense"
            id="description"
            label="Description"
            type="text"
						fullWidth
						value={input.description ? input.description : ''}
						onChange={(event) => setInput((prev) => ({
						...prev,
						description: event.target.value
						}))}
          />

			<form className={classes.container} noValidate>
							<TextField
								id="start_date"
								label="Start Date"
								type="date"
								value={input.from ? input.from : e.details.from}
								onChange={(event) => setInput((prev) => ({
								...prev,
								from: event.target.value
								}))}

								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</form>

				<form className={classes.container} noValidate>
							<TextField
								id="end_date"
								label="End Date"
								type="date"
								value={input.to ? input.to : e.details.to}
								onChange={(event) => setInput((prev) => ({
								...prev,
								to: event.target.value
								}))}

								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
				</form>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      

			<Dialog
				
        open={open.viewDialog ? open.viewDialog : false}
        TransitionComponent={Transition}
				keepMounted
				onClose={closeDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.dialogTitle}>
					{e.details ? e.details.title : ''}
					</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogBody} id="alert-dialog-slide-description">
					
          {e.details ? e.details.description : ''}
					
          </DialogContentText>
					<DialogContentText className={classes.dialogFoot} id="alert-dialog-slide-description">
					{e.details ? `From: ${e.details.from}` : ''}
          </DialogContentText>
					<DialogContentText className={classes.dialogFoot}  id="alert-dialog-slide-description">
				 {e.details ? `To: ${e.details.to}` : ''}
				 </DialogContentText>
					
        </DialogContent>
        <DialogActions>
				<Button onClick={openEdit} color="primary">
            Edit
          </Button>
          <Button onClick={deleteEvent} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

	</section>

		
	);
};

export default CalendarWidget;