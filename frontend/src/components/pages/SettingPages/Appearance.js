import React, { useState } from 'react';

import { useCookies } from 'react-cookie';

import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';

const { purpleTheme } = require('./Themes/purple');
const { blackTheme } = require('./Themes/black');

export default function Appearance() {
	const [cookies, setCookie] = useCookies(['userID']);
	const initialTheme = cookies.theme ? cookies.theme : 'PURPLE';
	const [theme, setTheme] = useState(initialTheme);

	const handleTheme = (newTheme) => {
		setCookie('theme', newTheme, { path: '/' });
		setTheme(newTheme);
	};

	if (theme === 'PURPLE') purpleTheme();
	if (theme === 'BLACK') blackTheme();

	return (
		<div id="settings-appearance">
			<h3>Appearance</h3>
			<ul>
				<li style={{ backgroundColor: '#fff' }}>
					<IconButton
						className="themes-btn"
						onClick={() => handleTheme('PURPLE')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div
							className="color-box"
							style={{ backgroundColor: 'rgb(59, 59, 59)' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'rgba(65, 65, 65, 0.932)' }}
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
						onClick={() => handleTheme('BLACK')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div className="color-box" style={{ backgroundColor: 'red' }}></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'blue' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'green' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'salmon' }}
						></div>
					</div>
				</li>
				<li style={{ backgroundColor: '#2C303A' }}>
					<IconButton
						style={{ color: 'white' }}
						className="themes-btn"
						onClick={() => handleTheme('PURPLE')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div className="color-box" style={{ backgroundColor: 'red' }}></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'blue' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'green' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'salmon' }}
						></div>
					</div>
				</li>
				<li style={{ backgroundColor: '#2C303A' }}>
					<IconButton
						style={{ color: 'white' }}
						className="themes-btn"
						onClick={() => handleTheme('PURPLE')}
					>
						<PaletteIcon />
					</IconButton>
					<div className="color-palette">
						<div className="color-box" style={{ backgroundColor: 'red' }}></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'blue' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'green' }}
						></div>
						<div
							className="color-box"
							style={{ backgroundColor: 'salmon' }}
						></div>
					</div>
				</li>
			</ul>
		</div>
	);
}
