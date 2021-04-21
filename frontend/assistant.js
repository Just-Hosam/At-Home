const axios = require('axios');
const AnyList = require('anylist');

const any = new AnyList({
	email: 'lhl.final.project.test@gmail.com',
	password: 'Temppass123',
});

let lastGroceryIndex = 0;
let lastChoreIndex = 0;

any.on('lists-update', (lists) => {
	const lastElemIndex = lists[0].items.length - 1;
	const newItem = lists[0].items[lastElemIndex]._name;

	const choreIndex = lists[1].items.length - 1;
	const newChore = lists[1].items[choreIndex]._name;

	if (lastElemIndex !== lastGroceryIndex) {
    console.log(newItem);
		lastGroceryIndex = lastElemIndex;
		axios
			.post(`http://localhost:8080/voice`, {
				inputGrocery: newItem,
			})
			.catch((err) => console.log(err));
	}

	if (choreIndex !== lastChoreIndex) {
    console.log(newChore);
		lastChoreIndex = choreIndex;
		axios
			.post(`http://localhost:8080/voice`, { text: newChore })
			.catch((err) => console.log(err));
	}
});

any.login().then(async () => {
	await any.getLists();
});
