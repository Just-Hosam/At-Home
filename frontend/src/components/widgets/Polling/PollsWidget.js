import { useState, useEffect } from 'react';
import axios from 'axios';
import parsePollingData from './parsePollingData';
import PieChart from './PieChart';
import CreatePoll from './CreatePoll';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import PieChartIcon from '@material-ui/icons/PieChart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useSocket from '../../../hooks/useSocket';
import { useCookies } from 'react-cookie';
import { light } from '@material-ui/core/styles/createPalette';

const PollsWidgetItem = (props) => {

	const [cookies] = useCookies(['userID']);
	const dash_id = cookies.dashboardId; 

	//websocket connection
	const { sendSocketMessage, broadcast } = useSocket();

	//set initial state
	const [mode, setMode] = useState('LOAD');

	const [state, setState] = useState({
		poll: {},
		options: [],
		hasVoted: false,
		picked: null,
	});

	//fetch polling data on inital render
	useEffect(() => {
		Promise.all([
			axios.get(`/dashboards/${dash_id}/polls`),
			axios.get(`/dashboards/${dash_id}/polls/options`),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				poll: all[0].data,
				options: all[1].data,
			}));
			console.log(all[1].data.length);
		if(all[1].data.length < 1){
			setMode('INIT')
		} else {
			setMode('OPTIONS');
		}
	
		});
	}, [broadcast.polls]); // <-- listen for websocket

	const renderWidget = () => {
		Promise.all([
			axios.get(`/dashboards/${dash_id}/polls`),
			axios.get(`/dashboards/${dash_id}/polls/options`),
		])
			.then((all) => {
				setState((prev) => ({
					...prev,
					poll: all[0].data,
					options: all[1].data,
				}));
			})
			.catch((err) => console.log(err));
	};

	//create a new poll
	const createPoll = (input) => {
		axios
			.post(`/dashboards/${dash_id}/polls`, { input })
			.then((res) => {
				return axios.post(`/dashboards/${dash_id}/polls/options`, { input });
			})
			.then((final) => {
				setState((prev) => ({
					...prev,
					poll: {},
					options: [],
					hasVoted: false,
				}));

				setMode('OPTIONS');
				renderWidget();
				sendSocketMessage(`polls`); // <-- send websocket msg
			})
			.catch((err) => console.log(err));
	};

	const createMode = () => {
		setMode('CREATE');
	};

	//vote on the poll
	const castVote = (index, choice) => {
		if (state.hasVoted) {
			return;
		}

		axios
			.post(`/dashboards/${dash_id}/polls/${index}`)
			.then((res) => {
				setState((prev) => ({
					...prev,
					hasVoted: true,
					picked: choice,
				}));
				renderWidget();

				sendSocketMessage(`polls`); // <-- send websocket msg
			})
			.catch((err) => console.log(err));
	};

	//shows the confirm delete mode
	const openConfirmDelete = () => {
		setMode('DELETE');
	};

	const cancelDelete = () => {
		setMode('OPTIONS');
	};

	//delete the entire poll
	const deletePoll = (admin) => {
		// <-------- ADD ADMIN PROTECTION

		Promise.all([
			axios.delete(`/dashboards/${dash_id}/polls`),
			axios.delete(`/dashboards/${dash_id}/polls/options`),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				poll: {},
				options: [],
				hasVoted: false,
			}));

			setMode('INIT');
			sendSocketMessage(`polls`); // <-- send websocket msg
		});
	};

	//shows the pie chart
	const showPie = () => {
		if (mode === 'OPTIONS') {
			setMode('PIE');
		} else {
			setMode('OPTIONS');
		}
	};

	//CONDITIONAL UI RENDERING

	const loader = (
		<div className="polls-loader">
			<CircularProgress className="poll-loader-icon" disableShrink />
		</div>
	);

	const pollIcons =
		!state.options || state.options.length < 1 ? null : (
			<div className="poll-icons">
				<PieChartIcon className="poll-pie-icon" onClick={showPie} />
			</div>
		);

		const deleteIcon = <div className='delete-icon-wrapper'>
		<DeleteIcon className="poll-delete-icon" onClick={openConfirmDelete} />
		</div>;

	const initial = (
		<div className="add-poll-container">
			<AddCircleIcon
				className="add-poll-icon"
				style={{ fontSize: 80 }}
				onClick={() => createMode()}
			/>
			<p>Create a new voting poll</p>
		</div>
	);

	const create = <CreatePoll createPoll={createPoll} />;

	const pollingData = parsePollingData(state, castVote);
	const op = pollingData.options ? pollingData.options : initial;

	const pie = (
		<div className="pie-chart">
			<PieChart title={state.poll} options={state.options} />
		</div>
	);

	const confirmDelete = (
		<div className="poll-delete">
			<p>
				Are you sure you want to delete this poll? This action cannot be undone.
			</p>
			<button onClick={() => cancelDelete()}>Cancel</button>
			<button id="poll-delete-btn" onClick={() => deletePoll()}>
				Delete
			</button>
		</div>
	);

	const determineMode = (mode) => {
		switch (mode) {
			case 'LOAD':
				return loader;
			case 'OPTIONS':
				return op;
			case 'INIT':
				return initial;
			case 'CREATE':
				return create;
			case 'PIE':
				return pie;
			case 'DELETE':
				return confirmDelete;
			default:
				console.log('error... MODE not found');
				return loader;
		}
	};

	const core = determineMode(mode);
	
	return (
		<div className="polls">
			
			<div className="header-wrapper">
				<header className="header">
			{mode === 'INIT' || mode === 'CREATE' ? null:  <h1>Voting Booth</h1>}	
			
						{pollingData.options && mode === 'OPTIONS'
								
							? <h2> {pollingData.title} </h2>
							: null}
					
				</header>
			</div>
			{pollIcons && mode !== 'DELETE' ? pollIcons : null}

			<div>
				<h3>{core}</h3>
				
			</div>

			{pollIcons && mode !== 'DELETE' && mode !== 'PIE' ? deleteIcon : null}
			
		
		</div>
	);
};

export default PollsWidgetItem;
