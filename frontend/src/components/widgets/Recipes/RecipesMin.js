import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import RecipesListItem from './RecipesListItem';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function RecipesMin(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = useContext(cookies.dashboardId);

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
			handleView={props.handleView}
		/>
	));

	return (
		<div id="widget-recipes">
			<h2>RECIPES</h2>
			<ul>{recipeList}</ul>
			<Button
				id="add-recipe-btn"
				variant="contained"
				onClick={() => props.handleView('RECIPE_ADD')}
			>
				Add Recipe
			</Button>
		</div>
	);
}
