const blackTheme = () => {
	document.documentElement.style.setProperty('--text-color', 'white');
	document.documentElement.style.setProperty('--text-color-alt', 'white');
	document.documentElement.style.setProperty('--accent-color', 'green');
	document.documentElement.style.setProperty('--accent-color-alt', 'limegreen');
	document.documentElement.style.setProperty('--card-color', 'grey');
	document.documentElement.style.setProperty('--background-color', 'darkgrey');
	document.documentElement.style.setProperty(
		'--error-color',
		'rgb(253, 72, 72)'
	);
};

module.exports = {
	blackTheme,
};
