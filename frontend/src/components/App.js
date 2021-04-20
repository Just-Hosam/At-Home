import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import urlParams from '../helpers/urlParams';

import Register from './pages/Register';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Navbar from './widgets/Navbar/Navbar';
import Grid from './widgets/Grid';
import useSocket from '../hooks/useSocket';

const App = () => {
	const { sendSocketMessage } = useSocket();
	const [cookies, setCookie] = useCookies(null);
	const initialPage = cookies.userData ? 'GRID' : 'LOGIN';
	const [page, setPage] = useState(initialPage);
	const handlePage = (page) => setPage(page);

	useEffect(() => {
		const invite = urlParams();

		if (invite) {
			setCookie('dashboardId', invite.id, { path: '/' });
			sendSocketMessage(invite.email);
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
