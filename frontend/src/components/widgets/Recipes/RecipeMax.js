import React, { useState } from 'react';

import RecipeShow from './RecipeShow';
import RecipeEdit from './RecipeEdit';
import RecipeAdd from './RecipeAdd';

export default function RecipeMax() {
	const dashboardId = 1;

	const [view, setView] = useState('SHOW');

	const handleView = (newView) => setView(newView);

	return (
		<div>
			{view === 'SHOW' && (
				<RecipeShow dashboardId={dashboardId} handleView={handleView} />
			)}
			{view === 'EDIT' && (
				<RecipeEdit dashboardId={dashboardId} handleView={handleView} />
			)}
			{view === 'ADD' && (
				<RecipeAdd dashboardId={dashboardId} handleView={handleView} />
			)}
		</div>
	);
}
