import React, { useState } from 'react';

// import Groceries from './widgets/Groceries';
// import PollsWidget from './widgets/Polling/PollsWidget';
// import CalendarWidget from './widgets/Calendar/CalendarWidget'

// import Photos from './widgets/Photos';
// import Gallery from './widgets/Gallery';
import RecipesMin from './widgets/Recipes/RecipesMin';
import RecipeMax from './widgets/Recipes/RecipeMax';
import RecipeAdd from './widgets/Recipes/RecipeAdd';
//import GalleryModal from './widgets/GalleryModal';

const App = () => {
	const dashboardId = 1;
	const [modalView, setModalView] = useState('');
	const [itemId, setItemId] = useState(0);

	const handleView = (newView, id) => {
		setModalView(newView);
		setItemId(id);
	};

	return (
		<div className="App">
			{modalView === '' && <RecipesMin handleView={handleView} />}
			{modalView === 'RECIPE_SHOW' && (
				<RecipeMax recipeId={itemId} handleView={handleView} />
			)}
			{modalView === 'RECIPE_ADD' && (
				<RecipeAdd handleView={handleView} dashboardId={dashboardId} />
			)}
		</div>
	);
};

export default App;
