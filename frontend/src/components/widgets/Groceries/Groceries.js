import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import Grocery from './Grocery';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useSocket from '../../../hooks/useSocket';

const axios = require('axios');

function Groceries(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;

	//websocket connection
	const { sendSocketMessage, broadcast } = useSocket();

	// const [groceries, setGroceries] = useState([]);
	const groceries = props.groceries;
	const setGroceries = props.setGroceries;
	const [input, setInput] = useState('');

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/groceries/`)
			.then((res) => setGroceries(res.data))
			.catch((err) => console.log('I AM A COMPONENT ERROR', err));
	}, [broadcast.groceries]);

	const toggleGrocery = (dashboardId, groceryId) => {
		axios
			.patch(`/dashboards/${dashboardId}/groceries/${groceryId}`)
			.then(() => {
				const newGroceriesArr = groceries.map((elem) =>
					elem.id === groceryId ? { ...elem, done: !elem.done } : elem
				);
				setGroceries([...newGroceriesArr]);
				sendSocketMessage('groceries'); // <-- send websocket msg
			})
			.catch((err) => console.log('I"M THE PATCH MONSTER', err));
	};

	const addGrocery = (inputGrocery) => {
		axios
			.post(`/dashboards/${dashboardId}/groceries/`, { inputGrocery })
			.then((res) => {
				setGroceries([res.data, ...groceries]);
				setInput('');
				sendSocketMessage('groceries');
			})
			.catch((err) => console.log('I"M THE POST MONSTER', err));
	};

	const unCheckedList = groceries.filter((grocery) => !grocery.done);
	const checkedList = groceries.filter((grocery) => grocery.done);

	const unCheckedComponents = unCheckedList.map((grocery) => (
		<Grocery
			key={grocery.id}
			itemId={grocery.id}
			item={grocery.text}
			onClick={toggleGrocery}
			dashboardId={dashboardId}
			isDone={grocery.done}
		/>
	));
	const checkedComponents = checkedList.map((grocery) => (
		<Grocery
			key={grocery.id}
			itemId={grocery.id}
			item={grocery.text}
			onClick={toggleGrocery}
			dashboardId={dashboardId}
			isDone={grocery.done}
		/>
	));

	return (
		<div id="widget-groceries">
			<h2>Groceries</h2>
			<form onSubmit={(event) => event.preventDefault()}>
				<TextField
					id="groceries-text"
					label="Add Grocery"
					variant="outlined"
					size="small"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					autoComplete="off"
				/>
				<Button
					id="groceries-btn"
					variant="contained"
					onClick={() => addGrocery(input)}
				>
					<i className="fas fa-plus"></i>
				</Button>
			</form>
			<div id="recipes-lists">
				<ul>{unCheckedList.length > 0 && unCheckedComponents}</ul>
				<p id="groceries-divider">
					checked list <i className="fas fa-chevron-left"></i>
				</p>
				<ul>{checkedList.length > 0 && checkedComponents}</ul>
			</div>
		</div>
	);
}

export default Groceries;
