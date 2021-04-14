import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import RecipeShow from './RecipeShow';
import RecipeEdit from './RecipeEdit';
import RecipeSend from './RecipeSend';

export default function RecipeMax(props) {
	const dashboardId = 1;
	const initialView = 'SHOW';

	const [view, setView] = useState(initialView);

	const handleEdit = (newView) => setView(newView);

	return (
		<div>
			{view === 'LOADING' && <CircularProgress />}
			{view === 'SHOW' && (
				<RecipeShow
					dashboardId={dashboardId}
					handleEdit={handleEdit}
					recipeId={props.recipeId}
					handleView={props.handleView}
				/>
			)}
			{view === 'EDIT' && (
				<RecipeEdit
					dashboardId={dashboardId}
					handleEdit={handleEdit}
					recipeId={props.recipeId}
					handleView={props.handleView}
				/>
			)}
			{view === 'SEND' && (
				<RecipeSend
					dashboardId={dashboardId}
					handleEdit={handleEdit}
					recipeId={props.recipeId}
					handleView={props.handleView}
				/>
			)}
		</div>
	);
}
