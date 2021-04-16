import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Dashboards() {
	const [cookies, setCookie] = useCookies(['userID']);
	const [dashboards, setDashboards] = useState([]);
	// const [selectedDashboard, setSelectedDashboard] = useState(cookies.dashboardId)

	useEffect(() => {
		axios
			.get(`/users/${cookies.userData.id}/dashboards`)
			.then((res) => {
				setDashboards(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	// TODO: not complete (doesn't update cookie immediatly, needs reload)
	// add selectedDashboard state and chagne on click
	const selectDashboard = (dashboardId) => {
		setCookie('dashboardId', dashboardId, { path: '/' });
	};

	const deleteDashboardLink = (dashboardId) => {
		axios
			.delete(`/users/${cookies.userData.id}/dashboards/${dashboardId}`)
			.then(() => {
				setDashboards((prev) => {
					return prev.filter((elem) => elem.id !== dashboardId);
				});
			});
	};

	const dashboardsList = dashboards.map((elem) => {
		return (
			<li key={elem.id}>
				<p>{elem.name}</p>
				<button onClick={() => selectDashboard(elem.id)}>select</button>
				<button onClick={() => deleteDashboardLink(elem.id)}>Delete</button>
			</li>
		);
	});

	return (
		<div>
			<h3>Dashboards</h3>
			<ul>{dashboardsList}</ul>
		</div>
	);
}
