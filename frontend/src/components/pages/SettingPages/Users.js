import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function Dashboards() {
	const [cookies] = useCookies(['userID']);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get(`/dashboards/${cookies.dashboardId}/users`)
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const removeUser = (userId) => {
		axios
			.delete(`/dashboards/${cookies.dashboardId}/users/${userId}`)
			.then(() => {
				setUsers((prev) => {
					return prev.filter((elem) => elem.user_id !== userId);
				});
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

	console.log(users);

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
					<IconButton
						className="deletebtn"
						onClick={() => removeUser(elem.user_id)}
					>
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

	return (
		<div id="settings-users">
			<h3>Users</h3>
			<ul>{usersList}</ul>
		</div>
	);
}
