import React from 'react';
import { useCookies } from 'react-cookie';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

export default function NavLoginReg(props) {
	const [cookies, , removeCookie] = useCookies(null);

	const logout = () => {
		removeCookie('userData', { path: '/' });
		props.handlePage('LOGIN');
	};
	return (
		<div id="nav-user-details">
			<div>
				<p>
					{cookies.userData.first_name} {cookies.userData.last_name}
				</p>
			</div>
			<IconButton
				id="navbar-settings"
				onClick={() => props.handlePage('SETTINGS')}
			>
				<SettingsIcon />
			</IconButton>
			<Button onClick={() => logout()} className="navbtn" variant="contained">
				Logout
			</Button>
		</div>
	);
}
