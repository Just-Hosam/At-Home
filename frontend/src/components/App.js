import React, { useState } from 'react';

// import Groceries from './widgets/Groceries';
// import Dropdown from './widgets/Dropdown/Dropdown';
// import PollWidget from './widgets/Polling/PollsWidget';
import Grid from './widgets/Grid';
// import CalendarWidget from './widgets/Calendar/CalendarWidget'


// import Photos from './widgets/Photos';
// import Gallery from './widgets/Gallery';


// import RecipesMin from './widgets/Recipes/RecipesMin';
// import RecipeMax from './widgets/Recipes/RecipeMax';
// import RecipeAdd from './widgets/Recipes/RecipeAdd';
// import GalleryModal from './widgets/GalleryModal';
// import RecipeSend from './widgets/Recipes/RecipeSend';


const App = () => {
	// const dashboardId = 1;
	// const [modalView, setModalView] = useState('');
	// const [itemId, setItemId] = useState(0);

	// const handleView = (newView, id) => {
	// 	setModalView(newView);
	// 	setItemId(id);
	// };

	return (
		<div className="App">
    	<Grid/>
			{/* {modalView === '' && <RecipesMin handleView={handleView} />}
			{modalView === 'RECIPE_SHOW' && (
				<RecipeMax recipeId={itemId} handleView={handleView} />
			)}
			{modalView === 'RECIPE_ADD' && (
				<RecipeAdd handleView={handleView} dashboardId={dashboardId} />
			)} */}
		</div>
	);
};













	


export default App;
