import React, { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import axios from 'axios';
import ArrowBack from '@material-ui/icons/ArrowBack';

export default function RecipeShow(props) {
	const dashboardId = props.dashboardId;
	const recipeId = props.recipeId;

	const [recipe, setRecipe] = useState({
		id: 0,
		dashboard_id: 0,
		title: '',
		directions: '',
		time: '',
		img_url: '',
		ingredients: [],
	});
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/recipes/${recipeId}`)
			.then((res) => {
				setRecipe(res.data);
				setIngredients(res.data.ingredients);
			})
			.catch((err) => console.log('Error getting recipe', err));
	}, [dashboardId, recipeId]);

	const handleDelete = () => {
		axios
			.delete(`/dashboards/${dashboardId}/recipes/${recipeId}`)
			.then(() => props.handleView(''));
	};

	const ingredientsList = ingredients.map((elem) => {
		const ingStr = '- ' + elem.measurement + ' of ' + elem.item;
		return <li key={elem.id}>{ingStr}</li>;
	});

	return (
		<div id="recipes-show">
			<IconButton
				className="recipe-show-back"
				aria-label="back"
				onClick={() => props.handleView('')}
			>
				<ArrowBackIcon />
			</IconButton>
			<div id="recipe-image">
				<img src={recipe.img_url} alt={recipe.title} />
			</div>
			<div id="recipe-header">
				<div id="recipe-title">
					<h2>{recipe.title}</h2>
					<i className="far fa-clock"></i>
					<span>{recipe.time}</span>
				</div>
				<div>
					<IconButton
						className="recipe-show-iconbtn"
						aria-label="edit"
						onClick={() => props.handleEdit('EDIT')}
					>
						<EditIcon />
					</IconButton>
					<IconButton
						className="recipe-show-iconbtn"
						aria-label="delete"
						onClick={() => {
							handleDelete();
							props.handleView('LOADING');
						}}
					>
						<DeleteIcon />
					</IconButton>
				</div>
			</div>
			<div id="recipe-ingredients">
				<div id="recipe-ing-header">
					<h3>Ingredients:</h3>

					<IconButton
						className="recipe-send-btn"
						aria-label="send"
						onClick={() => props.handleEdit('SEND')}
					>
						<i className="fas fa-paper-plane"></i>
					</IconButton>
				</div>
				<ul>{ingredientsList}</ul>
			</div>
			<div id="recipe-directions">
				<h3>Description:</h3>
				<p>{recipe.directions}</p>
			</div>
		</div>
	);
}
