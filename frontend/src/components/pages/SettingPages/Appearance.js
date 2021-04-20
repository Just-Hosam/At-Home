import React, { useState } from 'react';

import { useCookies } from 'react-cookie';

import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';

const { lightPurpleTheme } = require('./Themes/lightPurple');
const { lightBlueTheme } = require('./Themes/lightBlue');
const { darkYellowTheme } = require('./Themes/darkYellow');
const { darkPinkTheme } = require('./Themes/darkPink');

export default function Appearance() {
	const [cookies, setCookie] = useCookies(['userID']);
	const initialTheme = cookies.theme ? cookies.theme : 'LIGHT_PURPLE';
	const [theme, setTheme] = useState(initialTheme);

	const handleTheme = (newTheme) => {
		setCookie('theme', newTheme, { path: '/' });
		setTheme(newTheme);
	};

	if (theme === 'LIGHT_PURPLE') lightPurpleTheme();
	if (theme === 'LIGHT_BLUE') lightBlueTheme();
	if (theme === 'DARK_YELLOW') darkYellowTheme();
	if (theme === 'DARK_PINK') darkPinkTheme();

	return (
		<div id="settings-appearance">
			<h3>Appearance</h3>
			<ul>
				<li style={{ backgroundColor: '#fff' }}>
					<IconButton
						className="themes-btn"
						onClick={() => handleTheme('LIGHT_PURPLE')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div
							className="color-box"
							style={{ backgroundColor: '#fafafa' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'rgb(128, 118, 251)' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'rgb(96, 83, 247)' }}
						></div>
					</div>
				</li>
				<li style={{ backgroundColor: '#fff' }}>
					<IconButton
						className="themes-btn"
						onClick={() => handleTheme('LIGHT_BLUE')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div
							className="color-box"
							style={{ backgroundColor: '#fafafa' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: '#2fa2ff' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: '#1b8fee' }}
						></div>
					</div>
				</li>
				<li style={{ backgroundColor: '#2C303A' }}>
					<IconButton
						style={{ color: 'white' }}
						className="themes-btn"
						onClick={() => handleTheme('DARK_YELLOW')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div
							className="color-box"
							style={{ backgroundColor: '#1f1f1f' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: '#e2a54a' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: '#d39a45' }}
						></div>
					</div>
				</li>
				<li style={{ backgroundColor: '#2C303A' }}>
					<IconButton
						style={{ color: 'white' }}
						className="themes-btn"
						onClick={() => handleTheme('DARK_PINK')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div
							className="color-box"
							style={{ backgroundColor: '#1f1f1f' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'rgb(201, 103, 132)' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'rgb(204, 82, 118)' }}
						></div>
					</div>
				</li>
			</ul>
		</div>
	);
}
