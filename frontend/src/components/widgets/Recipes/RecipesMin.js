import React, { useState, useEffect } from 'react';

import RecipesListItem from './RecipesListItem';

import axios from 'axios';

export default function RecipesMin() {
	const dashboardId = 1; // TODO: needs useContext

	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/recipes/`)
			.then((res) => setRecipes(res.data))
			.catch((err) => console.log('Error getting recipes', err));
	}, []);

	const recipeList = recipes.map((recipe) => (
		<RecipesListItem
			key={recipe.id}
			recipeId={recipe.id}
			title={recipe.title}
			time={recipe.time}
			img_url={recipe.img_url}
		/>
	));

	return (
		<div id="widget-recipes">
			<h2>Recipes</h2>
			<ul>{recipeList}</ul>
		</div>
	);
}
