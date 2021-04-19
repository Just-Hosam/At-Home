// save the day please
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import urlParams from '../helpers/urlParams';

import Register from './pages/Register';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Navbar from './widgets/Navbar/Navbar';
import Grid from './widgets/Grid';

const App = () => {

	const [cookies, , removeCookie] = useCookies(null);

	const initialPage = cookies.userData ? 'GRID' : 'LOGIN';
	const [page, setPage] = useState(initialPage);

	const handlePage = (page) => setPage(page);

  
	useEffect(() => {      

	const invite = urlParams(); // <-- check url params for incoming invite
	
	if(invite){
		cookies.dashboardId = invite;
		removeCookie('userData', { path: '/' });
		handlePage('LOGIN');
	}
}, []); 

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
