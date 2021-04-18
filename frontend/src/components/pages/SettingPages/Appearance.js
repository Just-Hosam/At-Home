import React from 'react';

import { useCookies } from 'react-cookie';

export default function Appearance() {
	const [cookies, setCookie] = useCookies(['userID']);

	const handleTheme = (theme) => {
		setCookie('theme', theme, { path: '/' });
		if (theme === 'PURPLE') {
			document.documentElement.style.setProperty(
				'--text-color',
				'rgb(59, 59, 59)'
			);
			document.documentElement.style.setProperty(
				'--text-color-alt',
				'rgba(65, 65, 65, 0.932)'
			);
			document.documentElement.style.setProperty(
				'--accent-color',
				'rgb(96, 83, 247)'
			);
			document.documentElement.style.setProperty(
				'--accent-color-alt',
				'rgb(128, 118, 251)'
			);
			document.documentElement.style.setProperty('--card-color', '#fff');
			document.documentElement.style.setProperty(
				'--background-color',
				'#fdfdfd'
			);
			document.documentElement.style.setProperty(
				'--error-color',
				'rgb(253, 72, 72)'
			);
		}
		if (theme === 'BLACK') {
			document.documentElement.style.setProperty('--text-color', 'white');
			document.documentElement.style.setProperty('--text-color-alt', 'white');
			document.documentElement.style.setProperty('--accent-color', 'green');
			document.documentElement.style.setProperty(
				'--accent-color-alt',
				'limegreen'
			);
			document.documentElement.style.setProperty('--card-color', 'grey');
			document.documentElement.style.setProperty(
				'--background-color',
				'darkgrey'
			);
			document.documentElement.style.setProperty(
				'--error-color',
				'rgb(253, 72, 72)'
			);
		}
	};
	return (
		<div>
			<h3>hello world I am Appearance</h3>
			<ul>
				<li>
					<button onClick={() => handleTheme('PURPLE')}>PURPLE</button>
				</li>
				<li>
					<button onClick={() => handleTheme('BLACK')}>BLACK</button>
				</li>
			</ul>
		</div>
	);
}
