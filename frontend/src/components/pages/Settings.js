import React, { useState } from 'react';

import Profile from './SettingPages/Profile';
import Dashboards from './SettingPages/Dashboards';
import Users from './SettingPages/Users';
import Appearance from './SettingPages/Appearance';

export default function Settings(props) {
	// const [settingsPage, setSettingsPage] = useState('PROFILE');
	const [settingsPage, setSettingsPage] = useState('APPEARANCE');

	return (
		<div id="settings-page">
			<div id="settings-side">
				<h3>Account Settings</h3>
				<ul>
					<li onClick={() => setSettingsPage('PROFILE')}>Profile</li>
					<li onClick={() => setSettingsPage('DASHBOARDS')}>Dashboards</li>
					<li onClick={() => setSettingsPage('USERS')}>Users</li>
					<li onClick={() => setSettingsPage('APPEARANCE')}>Appearance</li>
				</ul>
			</div>
			<div id="settings-details">
				{settingsPage === 'PROFILE' && <Profile />}
				{settingsPage === 'DASHBOARDS' && (
					<Dashboards handlePage={props.handlePage} />
				)}
				{settingsPage === 'USERS' && <Users />}
				{settingsPage === 'APPEARANCE' && <Appearance />}
			</div>
		</div>
	);
}
