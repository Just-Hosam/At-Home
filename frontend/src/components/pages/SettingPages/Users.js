import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Dashboards() {
	const [cookies, setCookie] = useCookies(['userID']);
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
				<p>
					{elem.first_name}
					{elem.last_name}
				</p>
				<p>{elem.email}</p>
				{elem.admin && (
					<button onClick={() => toggleAdmin(elem.user_id, elem.admin)}>
						ADMIN
					</button>
				)}
				{!elem.admin && (
					<button onClick={() => toggleAdmin(elem.user_id, elem.admin)}>
						PEASANT
					</button>
				)}
				<button onClick={() => removeUser(elem.user_id)}>Remove</button>
			</li>
		);
	});

	return (
		<div>
			<h3>USERSSS</h3>
			<ul>{usersList}</ul>
		</div>
	);
}
