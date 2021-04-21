import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function Login(props) {
	const [cookies, setCookie] = useCookies(['userID']);
	const [userDetails, setUserDetails] = useState({
		email: '',
		password: '',
	});

	const submitUser = (event, userDetails) => {
		event.preventDefault();
		axios.post(`/login`, { inputUser: userDetails }).then((res) => {
			const userData = res.data;

			axios.get(`/users/${userData.id}/dashboards`).then((dashRes) => {
				setCookie('userData', userData, { path: '/' });
        setCookie('dashboardId', dashRes.data[0].id, { path: '/' });
				props.handlePage('GRID');
			});
		});
	};

	const updateUser = (field, value) => {
		setUserDetails((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div id="login-page">
			<header>
				<h2>Login</h2>
				<p>
					Welcome to <span>@Home</span>
				</p>
			</header>
			<form onSubmit={(event) => submitUser(event, userDetails)}>
				<TextField
					required={true}
					className="login-textfield"
					label="Email"
					variant="outlined"
					size="small"
					value={userDetails.email}
					onChange={(event) => updateUser('email', event.target.value)}
				/>
				<TextField
					required={true}
					type="password"
					className="login-textfield"
					label="Password"
					variant="outlined"
					size="small"
					value={userDetails.password}
					onChange={(event) => updateUser('password', event.target.value)}
				/>
				<Button className="submission" variant="contained" type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
}
