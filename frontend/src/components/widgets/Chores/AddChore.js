import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function AddChore(props) {
	const dashboardId = 1; // TODO: needs useContext

	// const [groceries, setGroceries] = useState([]);
	const [input, setInput] = useState('');

	// useEffect(() => {
	// 	axios
	// 		.get(`/dashboards/${dashboardId}/groceries/`)
	// 		.then((res) => setGroceries(res.data))
	// 		.catch((err) => console.log('I AM A COMPONENT ERROR', err));
	// }, []);

	// const toggleGrocery = (dashboardId, groceryId) => {
	// 	axios
	// 		.patch(`/dashboards/${dashboardId}/groceries/${groceryId}`)
	// 		.then(() => {
	// 			const newGroceriesArr = groceries.map((elem) =>
	// 				elem.id === groceryId ? { ...elem, done: !elem.done } : elem
	// 			);
	// 			setGroceries([...newGroceriesArr]);
	// 		})
	// 		.catch((err) => console.log('I"M THE PATCH MONSTER', err));
	// };

	const addNewChore = (input) => {
    console.log(`### addNewChore ### \n\tinput: `, input)
		axios
			.post(`/dashboards/${dashboardId}/chores/`, { text: input })
			.then((res) => {
        console.log(res.data)
        console.log(props)
        // console.log(res.data)
				// setGroceries([res.data, ...groceries]);
        props.setChoresList([...props.choresList, res.data]);
				setInput('');
			})
			.catch((err) => console.log('ERROR AT addNewChore', err));
	};

	return (
			<form onSubmit={(e) => e.preventDefault()}>
				<TextField
					id="groceries-text"
					label="Add Chore"
					variant="outlined"
					size="small"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					autoComplete="off"
				/>
				<Button
					id="groceries-btn"
					variant="contained"
					onClick={() => addNewChore(input)}
				>
					<i className="fas fa-plus"></i>
				</Button>
			</form>
	);
}
