import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios';
import useMailer from '../../../hooks/useMailer';
import useSocket from "../../../hooks/useSocket";

export default function Dashboards() {
	const [cookies] = useCookies(['userID']);
	const [users, setUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);

	const {sendInvite} = useMailer(); // <-- connect mailer
	const {broadcast} = useSocket(); // <-- connect websocket


	useEffect(() => {
		axios
			.get(`/dashboards/${cookies.dashboardId}/users`)
			.then((res) => {
				setUsers(res.data);
				axios
					.get(`/users`)
					.then((allUsersRes) => {
						const filteredUsers = allUsersRes.data.filter((elem) => {
							let finalAnswer = true;
							for (const innerElem of res.data) {
								if (innerElem.user_id === elem.id) finalAnswer = false;
							}
							return finalAnswer;
						});
						setAllUsers(filteredUsers);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, []);

	const removeUser = (userObj) => {
		axios
			.delete(`/dashboards/${cookies.dashboardId}/users/${userObj.user_id}`)
			.then(() => {
				setUsers((prev) => {
					return prev.filter((elem) => elem.user_id !== userObj.user_id);
				});
				setAllUsers((prev) => [userObj, ...prev]);
			})
			.catch((err) => console.log(err));
	};

	const toggleAdmin = (userId, userStatus) => {
		axios
			.patch(`/dashboards/${cookies.dashboardId}/users/${userId}`, {
				userAdminStatus: userStatus,
			})
			.then(() => {
				setUsers((prev) => {
					return prev.map((elem) => {
						if (elem.user_id === userId) return { ...elem, admin: !elem.admin };
						return elem;
					});
				});
			})
			.catch((err) => console.log(err));
	};

	const usersList = users.map((elem) => {
		return (
			<li key={elem.user_id}>
				<div id="users-user-details">
					<p>
						{elem.first_name}
						{elem.last_name}
					</p>
					<span>{elem.email}</span>
				</div>
				<div>
					<IconButton className="deletebtn" onClick={() => removeUser(elem)}>
						<DeleteIcon />
					</IconButton>

					{elem.admin && (
						<Button
							className="admin-btns"
							variant="contained"
							onClick={() => toggleAdmin(elem.user_id, elem.admin)}
						>
							Admin
						</Button>
					)}
					{!elem.admin && (
						<Button
							className="peasant-btns"
							variant="contained"
							onClick={() => toggleAdmin(elem.user_id, elem.admin)}
						>
							Peasant
						</Button>
					)}
				</div>
			</li>
		);
	});

	useEffect(() => { // <-- updates ui when  user accepts invite

	if(broadcast.invite) {  
		
		axios
			.post(`/dashboards/${cookies.dashboardId}/users`, {
				userEmail: broadcast.invite,
			})
			.then((res) => {
				setUsers((prev) => {
					return [res.data, ...prev];
				});
				setAllUsers((prev) => {
					return prev.filter((elem) => elem.id !== res.data.id);
				});
			});
	}

	}, [broadcast.invite]); 

	const sendInviteEmail = event => {
	event.preventDefault();
	sendInvite(event.target[0].value); // <-- send email invite
	}

	return (
		<div id="settings-users">
			<h3>Users</h3>
			<form id="add-user-form" onSubmit={(e) => sendInviteEmail(e)}>
				<Autocomplete
					id="add-user-search"
					freeSolo
					options={allUsers.map((option) => `${option.email}`)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Add User"
							margin="normal"
							variant="outlined"
							size="small"
						/>
					)}
				/>
				<Button type="submit" className="add-btn" variant="contained" fullWidth>
					Add
				</Button>
			</form>
			<ul>{usersList}</ul>
		</div>
	);
}
