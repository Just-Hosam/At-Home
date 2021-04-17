import React, { useState } from 'react';

import { useCookies } from 'react-cookie';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function Register(props) {
	const [, setCookie] = useCookies(['userID']);
	const [userDetails, setUserDetails] = useState({
		email: '',
		password: '',
	});

	const updateUser = (field, value) => {
		setUserDetails((prev) => ({ ...prev, [field]: value }));
	};

	const submitUser = (event, userDetails) => {
		event.preventDefault();
		axios.post(`/users/`, { inputUser: userDetails }).then((res) => {
			setCookie('userData', res.data, { path: '/' });
			props.handlePage('GRID');
		});
	};

	return (
		<div id="register-page">
			<header>
				<h2>Register</h2>
				<p>
					Welcome to <span>@Home</span>
				</p>
			</header>
			<form onSubmit={(event) => submitUser(event, userDetails)}>
				<TextField
					required={true}
					autoComplete="off"
					className="login-textfield"
					label="First Name"
					variant="outlined"
					size="small"
					value={userDetails.firstName}
					onChange={(event) => updateUser('firstName', event.target.value)}
				/>
				<TextField
					required={true}
					autoComplete="off"
					className="login-textfield"
					label="Last Name"
					variant="outlined"
					size="small"
					value={userDetails.lastName}
					onChange={(event) => updateUser('lastName', event.target.value)}
				/>
				<TextField
					required={true}
					autoComplete="off"
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
					autoComplete="off"
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
