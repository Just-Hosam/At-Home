import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import axios from 'axios';

export default function RecipeSend(props) {
	const dashboardId = props.dashboardId;
	const recipeId = props.recipeId;

	const [ingredients, setIngredients] = useState([]);

	const handleChange = (id) => {
		setIngredients((prev) => {
			return prev.map((elem) => {
				if (elem.id === id) return { ...elem, checked: !elem.checked };
				return elem;
			});
		});
	};

	const newIngArr = (ingArr) => {
		return ingArr.map((elem) => {
			return { ...elem, checked: true };
		});
	};

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/recipes/${recipeId}/ingredients`)
			.then((res) => {
				setIngredients(newIngArr(res.data));
			});
	}, [dashboardId, recipeId]);

	const newList = ingredients.map((elem) => {
		return (
			<li key={elem.id}>
				<Checkbox
					checked={elem.checked}
					onChange={() => handleChange(elem.id)}
					inputProps={{ 'aria-label': 'primary checkbox' }}
				/>
				<p>{elem.item}</p>
			</li>
		);
	});

	const checkIngredients = ingredients.filter((elem) => elem.checked);

	const sendToIngredients = (ingArr) => {
		axios
			.post(`/dashboards/${dashboardId}/groceries/`, { inputGrocery: ingArr })
			.then((res) => props.handleEdit('SHOW'));
	};
	return (
		<div>
			<ul>{newList}</ul>
			<button onClick={() => props.handleView('SHOW')}>back</button>
			<button onClick={() => sendToIngredients(checkIngredients)}>send</button>
		</div>
	);
}
