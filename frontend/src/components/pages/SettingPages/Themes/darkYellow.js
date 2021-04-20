const darkYellowTheme = () => {
	document.documentElement.style.setProperty(
		'--text-color',
		'rgb(177, 177, 177)'
	);
	document.documentElement.style.setProperty(
		'--text-color-alt',
		'rgba(179, 179, 179, 0.932)'
	);
	document.documentElement.style.setProperty('--text-color-button', '#2c303a');
	document.documentElement.style.setProperty(
		'--text-color-icon',
		'rgba(114, 114, 114, 0.932)'
	);
	document.documentElement.style.setProperty('--accent-color', '#e2a54a');
	document.documentElement.style.setProperty('--accent-color-alt', '#d39a45');
	document.documentElement.style.setProperty('--card-color', '#2c303a');
	document.documentElement.style.setProperty('--background-color', '#1f1f1f');
	document.documentElement.style.setProperty(
		'--error-color',
		'rgb(253, 72, 72)'
	);
};

module.exports = {
	darkYellowTheme,
};
