import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import Register from './pages/Register';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Navbar from './widgets/Navbar/Navbar';
import Grid from './widgets/Grid';

const App = () => {
	const [cookies] = useCookies(null);
	const initialPage = cookies.userData ? 'GRID' : 'LOGIN';
	const [page, setPage] = useState(initialPage);
	// const [page, setPage] = useState('SETTINGS');

	const handlePage = (page) => setPage(page);

	return (
		<div className="App">
			<Navbar handlePage={handlePage} />
			{page === 'GRID' && <Grid />}
			{page === 'SETTINGS' && <Settings handlePage={handlePage} />}
			{page === 'LOGIN' && <Login handlePage={handlePage} />}
			{page === 'REGISTER' && <Register handlePage={handlePage} />}
		</div>
	);
};

export default App;
