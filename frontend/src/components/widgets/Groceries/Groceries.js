import React, { useState, useEffect } from 'react';

import Grocery from './Grocery';

const axios = require('axios');

export default function Groceries() {
	const dashboardId = 1; // TODO: needs useContext

	
	const [groceries, setGroceries] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/groceries/`)
			.then((res) => setGroceries(res.data))
			.catch((err) => console.log('I AM A COMPONENT ERROR', err));
	}, []);

	const toggleGrocery = (dashboardId, groceryId) => {
		axios
			.patch(`/dashboards/${dashboardId}/groceries/${groceryId}`)
			.then(() => {
				const newGroceriesArr = groceries.map((elem) =>
					elem.id === groceryId ? { ...elem, done: !elem.done } : elem
				);
				setGroceries([...newGroceriesArr]);
			})
			.catch((err) => console.log('I"M THE PATCH MONSTER', err));
	};

	const addGrocery = (inputGrocery) => {
		axios
			.post(`/dashboards/${dashboardId}/groceries/`, { inputGrocery })
			.then((res) => {
				setGroceries([res.data, ...groceries]);
				setInput('');
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
		/>
	));
	const checkedComponents = checkedList.map((grocery) => (
		<Grocery
			key={grocery.id}
			itemId={grocery.id}
			item={grocery.text}
			onClick={toggleGrocery}
			dashboardId={dashboardId}
		/>
	));

	return (
		<div id="widget-groceries">
			<h1>Groceries</h1>
			<form id="input-groceries" onSubmit={(event) => event.preventDefault()}>
				<input
					value={input}
					onChange={(event) => setInput(event.target.value)}
					type="text"
				/>
				<button onClick={() => addGrocery(input)}>Hello</button>
			</form>
			{unCheckedList.length > 0 && unCheckedComponents}
			<p>checked list</p>
			{checkedList.length > 0 && checkedComponents}
		</div>
	);
}
