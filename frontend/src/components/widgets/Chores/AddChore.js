import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import useSocket from '../../../hooks/useSocket';

export default function AddChore(props) {
	const dashboardId = 1; // TODO: needs useContext
	const [input, setInput] = useState('');

	const { sendSocketMessage } = useSocket();

	const addNewChore = (input) => {
		axios
			.post(`/dashboards/${dashboardId}/chores/`, { text: input })
			.then((res) => {
				props.setChoresList([...props.choresList, res.data]);
				setInput('');
				sendSocketMessage('chores');
			})
			.catch((err) => console.log('ERROR AT addNewChore', err));
	};

	return (
		<form
			style={{ display: 'flex', justifyContent: 'center' }}
			onSubmit={(e) => e.preventDefault()}
		>
			<TextField
				id="add-chore-input"
				label="Add Chore"
				variant="outlined"
				size="small"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				autoComplete="off"
			/>
			<Button
				id="chores-btn"
				variant="contained"
				onClick={() => addNewChore(input)}
			>
				<i className="fas fa-plus"></i>
			</Button>
		</form>
	);
}
