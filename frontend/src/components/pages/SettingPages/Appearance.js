import React, { useState } from 'react';

import { useCookies } from 'react-cookie';

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
		<div id="appearance-settings">
			<h3>hello world I am Appearance</h3>
			<ul>
				<li id="purple-theme">
					<button onClick={() => handleTheme('PURPLE')}>PURPLE</button>
					<div className="color-box" style></div>
					<div className="color-box"></div>
					<div className="color-box"></div>
					<div className="color-box"></div>
				</li>
				<li>
					<button onClick={() => handleTheme('BLACK')}>BLACK</button>
				</li>
			</ul>
		</div>
	);
}
