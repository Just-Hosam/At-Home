import React, { useState, useEffect } from 'react';

import axios from 'axios';

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

	const ingredientsList = ingredients.map((elem) => {
		const ingStr = '- ' + elem.measurement + ' of ' + elem.item;
		return <li key={elem.id}>{ingStr}</li>;
	});

	return (
		<div id="recipes-max">
			<div id="recipe-image">
				<img src={recipe.img_url} alt={recipe.title} />
			</div>
			<div id="recipe-time">
				<i className="far fa-clock"></i>
				<span>{recipe.time}</span>
			</div>
			<div id="recipe-header">
				<h2>{recipe.title}</h2>
				<div>
					<i
						className="fas fa-pen"
						onClick={() => props.handleEdit('EDIT')}
					></i>
					<i className="fas fa-trash"></i>
				</div>
			</div>
			<div id="recipe-ingredients">
				<h3>Ingredients:</h3>
				<i className="fas fa-paper-plane" onClick={() => {}}></i>
				<ul>{ingredientsList}</ul>
			</div>
			<div id="recipe-directions">
				<h3>Description:</h3>
				<p>{recipe.directions}</p>
			</div>
			<button onClick={() => props.handleView('')}>back</button>
		</div>
	);
}
