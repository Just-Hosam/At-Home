import React, { useState } from 'react';

import { useCookies } from 'react-cookie';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function Profile() {
	const [cookies, setCookie] = useCookies(['userID']);
	const [userDetails, setUserDetails] = useState(cookies.userData);

	const updateUser = (field, value) => {
		setUserDetails((prev) => ({ ...prev, [field]: value }));
	};

	const submitUser = (event, userDetails) => {
		event.preventDefault();
		axios
			.patch(`/users/${userDetails.id}`, { inputUser: userDetails })
			.then((res) => {
				setCookie('userData', res.data, { path: '/' });
			});
	};

	return (
		<div>
			<h3>Profile</h3>
			<form onSubmit={(event) => submitUser(event, userDetails)}>
				<TextField
					required={true}
					autoComplete="off"
					className="profile-textfield"
					label="First Name"
					variant="outlined"
					size="small"
					value={userDetails.first_name}
					onChange={(event) => updateUser('first_name', event.target.value)}
				/>
				<TextField
					required={true}
					autoComplete="off"
					className="profile-textfield"
					label="Last Name"
					variant="outlined"
					size="small"
					value={userDetails.last_name}
					onChange={(event) => updateUser('last_name', event.target.value)}
				/>
				<TextField
					required={true}
					autoComplete="off"
					className="profile-textfield"
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
