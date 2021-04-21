import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useCookies } from 'react-cookie';

import RecipeShow from './RecipeShow';
import RecipeEdit from './RecipeEdit';
import RecipeSend from './RecipeSend';

export default function RecipeMax(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;

	const [view, setView] = useState('SHOW');

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
					handleClose={props.handleClose}
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
					setGroceries={props.setGroceries}
					handleClose={props.handleClose}
				/>
			)}
		</div>
	);
}
