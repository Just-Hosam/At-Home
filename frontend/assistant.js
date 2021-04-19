const axios = require('axios');
const AnyList = require('anylist');

const any = new AnyList({
	email: 'lhl.final.project.test@gmail.com',
	password: 'Temppass123',
});

any.on('lists-update', (lists) => {
	const lastElemIndex = lists[0].items.length - 1;
	const newItem = lists[0].items[lastElemIndex]._name;

	axios
		.post(`http://localhost:8080/voice`, {
			inputGrocery: newItem,
		})
		.catch((err) => console.log(err));
});

any.login().then(async () => {
	await any.getLists();
});
