const purpleTheme = () => {
	document.documentElement.style.setProperty('--text-color', 'rgb(59, 59, 59)');
	document.documentElement.style.setProperty(
		'--text-color-alt',
		'rgba(179, 179, 179, 0.932)'
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
	document.documentElement.style.setProperty('--background-color', '#fdfdfd');
	document.documentElement.style.setProperty(
		'--error-color',
		'rgb(253, 72, 72)'
	);
	document.documentElement.style.setProperty('--real-card-color', '#fff');
};

module.exports = {
	purpleTheme,
};
