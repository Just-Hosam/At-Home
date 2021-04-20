import React, { useState, useEffect } from 'react';
import Calendar from 'react-awesome-calendar';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useSocket from '../../../hooks/useSocket';

//COMPONENT STARTS
const CalendarWidget = (props) => {


	const [cookies] = useCookies(['userID']);
	const dash_id = cookies.dashboardId;

		//websocket connection
	const { sendSocketMessage, broadcast } = useSocket();

	const [e, setEvents] = useState({
		events: [],
		details: {
			title: '',
			description: '',
			from: '',
			to: '',
		},
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
		viewDialog: false,
	});

	//  fetch events data on inital render
	useEffect(() => {
		Promise.all([axios.get(`/dashboards/${dash_id}/events`)]).then((e) => {
			// Necessary because of naming conflics between the calendar component and SQL, for example the object key 'from' is need for the calendar to render but cannot be used in a SQL query.
			const parsedEvents = e[0].data.map((event) => {
				return {
					id: event.id,
					color: 'rgb(96, 83, 247)',
					from: event.start_at,
					to: event.end_at,
					title: event.title,
					description: event.description,
				};
			});

			setEvents((prev) => ({
				...prev,
				events: parsedEvents,
				details: {},
			}));
		});
	}, [broadcast.calendar]);

	const renderWidget = () => {
		Promise.all([axios.get(`/dashboards/${dash_id}/events`)]).then((e) => {
			const parsedEvents = e[0].data.map((event) => {
				return {
					id: event.id,
					color: 'rgb(96, 83, 247)',
					from: event.start_at,
					to: event.end_at,
					title: event.title,
					description: event.description,
				};
			});

			setEvents((prev) => ({
				...prev,
				events: parsedEvents,
				details: {},
			}));
		});
	};

	//create event
	const createEvent = (newEvent) => {
		axios
			.post(`/dashboards/${dash_id}/events`, { newEvent })
			.then((res) => {
				renderWidget();

				setOpen({
					inputDialog: false,
				});

				sendSocketMessage('calendar'); // <-- send websocket msg
			})
			.catch((err) => console.log(err));
	};

	//edit event
	const editEvent = (editedEvent) => {
		axios
			.patch(`/dashboards/${dash_id}/events/edit`, { editedEvent })
			.then((res) => {
				renderWidget();

				setOpen({
					inputDialog: false,
				});

				sendSocketMessage('calendar'); // <-- send websocket msg
			})
			.catch((err) => console.log(err));
	};

	//delete event
	const deleteEvent = () => {
	
		axios
			.delete(`/dashboards/${dash_id}/events/${e.details.id}`)
			.then((res) => {
				renderWidget();

				setOpen({
					viewDialog: false,
				});

				sendSocketMessage('calendar'); // <-- send websocket msg
			})
			.catch((err) => console.log(err));
	};

	//DIALOG

	const handleClickOpen = (event) => {
		setOpen({
			inputDialog: true,
		});
		const from = parseIncomingDate(event);
		setInput({
			from: from,
		});
	};

	const parseIncomingDate = (event) => {
		const month = event.month + 1;
		const monthStr = month < 10 ? `0${month}` : month;
		const day = event.day < 10 ? `0${event.day}` : event.day;
		const hour = Math.floor(event.hour);
		const hourStr = hour < 10 ? `0${hour}` : hour;
		const parsedDate = `${event.year}-${monthStr}-${day}T${hourStr}:00:00+00:00`;

		return parsedDate;
	};

	const saveEvent = () => {
		if (!input) {
			return closeDialog();
		}

		const id = e.events.length < 1 ? 1 : e.events.length + 1;
		const to = input.to ? `${input.to}T00:00:00+00:00` : input.from;

		const newEvent = {
			id: id,
			color: 'rgb(96, 83, 247)',
			from: input.from,
			to: to,
			title: input.title,
			description: input.description,
		};

		createEvent(newEvent);
	};

	const openEdit = () => {
		setInput({
			title: e.details.title,
			description: e.details.description,
		});

		setOpen({
			editDialog: true,
		});
	};

	const saveEdit = () => {
		if (!input) {
			return alert('Missing Required Field');
		}

		let from = input.from ? input.from : e.details.from;
		let to = input.to ? input.to : e.details.to;
		from = `${from}T00:00:00+00:00`;
		to = `${to}T00:00:00+00:00`;

		const editedEvent = {
			id: e.details.id,
			color: 'rgb(96, 83, 247)',
			from: from,
			to: to,
			title: input.title,
			description: input.description,
		};

		editEvent(editedEvent);
	};

	//VIEW EVENT DETAILS

	const fetchEventDetails = (id) => {
		for (const event of e.events) {
			if (event.id === id) {
				const eventDetails = {
					id: event.id,
					title: event.title,
					description: event.description,
					from: event.from.substr(0, 10),
					to: event.to.substr(0, 10),
				};

				return eventDetails;
			}
		}
	};

	const openEventDialog = (id) => {
		const eventDetails = fetchEventDetails(id);

		setEvents((prev) => ({
			...prev,
			events: [...e.events],
			details: eventDetails,
		}));

		setOpen({
			viewDialog: true,
		});
	};

	//closes all dialogs and updates state
	const closeDialog = () => {
		setOpen({
			inputDialog: false,
			editDialog: false,
			viewDialog: false,
		});

		setInput({
			title: '',
			description: '',
			from: '',
			to: '',
		});

		setEvents((prev) => ({
			...prev,
			events: [...e.events],
			// details: {}
		}));
	};

	return (
		<div id="calendar-widget">
			<div className="calendar-class">
				<Calendar
					id='calendar-main'
					events={e.events}
					onClickEvent={(event) => openEventDialog(event)}
					onClickTimeLine={(event) => handleClickOpen(event)}
				/>
			</div>

			<Dialog
				open={open.inputDialog ? open.inputDialog : false}
				onClose={closeDialog}
				aria-labelledby="form-dialog-title"
			>
					<DialogContent className="calendar-dialog-head">
					Create a new event
					</DialogContent>
				
				<DialogContent className='calendar-dialog-wrapper'>
					<DialogContentText id="calendar-dialog-body">
						Simply enter your event details and save.
					</DialogContentText>
					<TextField
			
						margin="dense"
						id="title"
						label="Title"
						type="text"
						variant="outlined"
						autoComplete="off"
						fullWidth
						value={input.title ? input.title : ''}
						onChange={(event) =>
							setInput((prev) => ({
								...prev,
								title: event.target.value,
							}))
						}
					/>
					<div className='content-divider'></div>
					<TextField
						margin="dense"
						id="description"
						label="Description"
						type="text"
						variant="outlined"
						autoComplete="off"
						fullWidth
						value={input.description ? input.description : ''}
						onChange={(event) =>
							setInput((prev) => ({
								...prev,
								description: event.target.value,
							}))
						}
					/>
					<div className='content-bottom-divider'></div>
					
					<form noValidate>
						<TextField
							id="date-picker"
							label="End Date"
							type="date"
							value={input.to ? input.to : ''}
							onChange={(event) =>
								setInput((prev) => ({
									...prev,
									to: event.target.value,
								}))
							}
						
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button id='calendar-cancel-btn' onClick={closeDialog} >
						Cancel
					</Button>
					<Button id='calendar-save-btn' onClick={saveEvent} >
						Save
					</Button >
				</DialogActions>
			</Dialog>

			<Dialog
				open={open.editDialog ? open.editDialog : false}
				onClose={closeDialog}
				aria-labelledby="form-dialog-title"
			>
					<DialogContent className='calendar-dialog-head' >
						Edit event
					</DialogContent>
				<DialogContent className='calendar-dialog-wrapper'>
					<DialogContentText id="calendar-dialog-body">
						Simply edit your event details and save.
					</DialogContentText>
					
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Title"
						type="text"
						variant="outlined"
						autoComplete="off"
						fullWidth
						value={input.title ? input.title : ''}
						onChange={(event) =>
							setInput((prev) => ({
								...prev,
								title: event.target.value,
							}))
						}
					/>
				
					<TextField
					className='calendar-inputs'
						margin="dense"
						id="description"
						label="Description"
						type="text"
						variant="outlined"
						autoComplete="off"
						fullWidth
						value={input.description ? input.description : ''}
						onChange={(event) =>
							setInput((prev) => ({
								...prev,
								description: event.target.value,
							}))
						}
					/>
					<div className='content-bottom-divider'></div>
					
					<form noValidate>
						<TextField
							id="start_date"
							label="Start Date"
							type="date"
							value={input.from ? input.from : e.details.from}
							onChange={(event) =>
								setInput((prev) => ({
									...prev,
									from: event.target.value,
								}))
							}
						
							InputLabelProps={{
								shrink: true,
							}}
						/>

					</form>
					<div className='content-bottom-divider'></div>
					
					<form>
					<TextField
							id="end_date"
							label="End Date"
							type="date"
							value={input.to ? input.to : e.details.to}
							onChange={(event) =>
								setInput((prev) => ({
									...prev,
									to: event.target.value,
								}))
							}
							
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</form>

				
				</DialogContent>
				<DialogActions>
					<Button id='calendar-cancel-btn' onClick={closeDialog} >
						Cancel
					</Button>
					<Button id='calendar-save-btn' onClick={saveEdit} >
						Save
					</Button>
				</DialogActions>
			</Dialog>



			<Dialog
				className="alert-dialog-slide-background"
				open={open.viewDialog ? open.viewDialog : false}
				keepMounted
				onClose={closeDialog}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<div className='calendar-dialog-wrapper'>
				<DialogContent 
				className='calendar-dialog-head'>
					{e.details ? e.details.title : ''}
				</DialogContent>

				<DialogContent 	>
					<DialogContentText
						id='calendar-dialog-body'
					>
						{e.details ? e.details.description : ''}
					</DialogContentText>
					<DialogContentText
						className='calendar-dialog-foot'
						id="alert-dialog-slide-description"
					>
						{e.details ? `From: ${e.details.from}` : ''}
					</DialogContentText>
					<DialogContentText
			
						id="alert-dialog-slide-description"
					>
						{e.details ? `To: ${e.details.to}` : ''}
					</DialogContentText>
				</DialogContent>
				</div>
				<DialogActions >
					<Button id='calendar-edit-btn' onClick={openEdit}>
						Edit
					</Button>
					<Button id='calendar-delete-btn' onClick={deleteEvent}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default CalendarWidget;
