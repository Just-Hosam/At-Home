import React, { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Dashboards(props) {
	const [cookies, setCookie] = useCookies(null);
	const [dashboards, setDashboards] = useState([]);

	useEffect(() => {
		axios
			.get(`/users/${cookies.userData.id}/dashboards`)
			.then((res) => {
				setDashboards(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const selectDashboard = (dashboardId) => {
		setCookie('dashboardId', dashboardId, { path: '/' });
		props.handlePage('GRID');
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
		console.log(cookies.dashboardId, '===', elem.id);
		return (
			<li key={elem.id}>
				<p>{elem.name}</p>
				<div>
					<IconButton
						className="dashboards-deletebtn"
						onClick={() => deleteDashboardLink(elem.id)}
					>
						<DeleteIcon />
					</IconButton>
					{elem.id === Number(cookies.dashboardId) && (
						<Button
							className="dashboards-btns selected"
							variant="contained"
							onClick={() => selectDashboard(elem.id)}
						>
							Selected
						</Button>
					)}
					{elem.id !== Number(cookies.dashboardId) && (
						<Button
							className="dashboards-btns"
							variant="contained"
							onClick={() => selectDashboard(elem.id)}
						>
							Select
						</Button>
					)}
				</div>
			</li>
		);
	});

	return (
		<div id="settings-dashboards">
			<h3>Dashboards</h3>
			<ul>{dashboardsList}</ul>
		</div>
	);
}
