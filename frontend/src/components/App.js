import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import Register from './pages/Register';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Navbar from './widgets/Navbar/Navbar';
import Grid from './widgets/Grid';

// import Profile from './pages/SettingPages/Profile';
// import Dashboards from './pages/SettingPages/Dashboards';
// import Users from './pages/SettingPages/Users';

// import Groceries from './widgets/Groceries';
// import Dropdown from './widgets/Dropdown/Dropdown';
// import PollWidget from './widgets/Polling/PollsWidget';
// import CalendarWidget from './widgets/Calendar/CalendarWidget'

import Chore from './widgets/Chores/Chore';
// import Chores from './widgets/Chores/Chores';
// import AddChores from './widgets/Chores/DoneChores';
// import Gallery from './widgets/Gallery';

// import RecipesMin from './widgets/Recipes/RecipesMin';
// import RecipeMax from './widgets/Recipes/RecipeMax';
// import RecipeAdd from './widgets/Recipes/RecipeAdd';
// import GalleryModal from './widgets/GalleryModal';
// import RecipeSend from './widgets/Recipes/RecipeSend';

const App = () => {
	const [cookies] = useCookies(null);
	const initialPage = cookies.userData ? 'GRID' : 'LOGIN';
	const [page, setPage] = useState(initialPage);

	const handlePage = (page) => setPage(page);

	// jwt token

	// const dashboardId = 1;
	// const [modalView, setModalView] = useState('');
	// const [itemId, setItemId] = useState(0);

	// const handleView = (newView, id) => {
	// 	setModalView(newView);
	// 	setItemId(id);
	// };

	return (
		<div className="App">
			{/* <Navbar handlePage={handlePage} />
			{page === 'GRID' && <Grid />}
			{page === 'SETTINGS' && <Settings />}
			{page === 'LOGIN' && <Login handlePage={handlePage} />}
			{page === 'REGISTER' && <Register handlePage={handlePage} />} */}
			<Chore />
			{/* <StateProvider>
				{modalView === '' && <RecipesMin handleView={handleView} />}
				{modalView === 'RECIPE_SHOW' && (
					<RecipeMax recipeId={itemId} handleView={handleView} />
				)}
				{modalView === 'RECIPE_ADD' && <RecipeAdd handleView={handleView} />}
			</StateProvider> */}
		</div>
	);
};

export default App;
