import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import RecipesListItem from './RecipesListItem';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function RecipesMin(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;

	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/recipes/`)
			.then((res) => setRecipes(res.data))
			.catch((err) => console.log('Error getting recipes', err));
	}, [dashboardId]);

	const handleAddButton = () => {
		props.handleView('RECIPE_ADD');
		props.handleOpen();
	};

	const recipeList = recipes.map((recipe) => (
		<RecipesListItem
			key={recipe.id}
			recipeId={recipe.id}
			title={recipe.title}
			time={recipe.time}
			img_url={recipe.img_url}
			handleView={props.handleView}
			handleOpen={props.handleOpen}
		/>
	));

	return (
		<div id="widget-recipes">
			<div id="recipes-min-header">
				<div id="recipes-empty"></div>
				<h2>Recipes</h2>
				<Button
					onClick={() => handleAddButton()}
					id="recipes-btn"
					variant="contained"
				>
					<i className="fas fa-plus"></i>
				</Button>
			</div>
			<ul>{recipeList}</ul>
		</div>
	);
}
