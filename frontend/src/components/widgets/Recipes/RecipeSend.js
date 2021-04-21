import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import axios from 'axios';

export default function RecipeSend(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;
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
					className="checkbox"
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
			.then((res) => {
				props.setGroceries((prev) => [...res.data, ...prev]);
				props.handleClose();
			});
	};
	return (
		<div id="recipes-send">
			<div id="recipes-send-header">
				<IconButton
					className="recipes-send-back"
					onClick={() => props.handleEdit('SHOW')}
				>
					<ArrowBackIcon />
				</IconButton>
				<h2>Send to Groceries</h2>
			</div>
			<ul>{newList}</ul>
			<Button
				className="recipes-send-send"
				fullWidth
				variant="contained"
				onClick={() => sendToIngredients(checkIngredients)}
			>
				send
			</Button>
		</div>
	);
}
