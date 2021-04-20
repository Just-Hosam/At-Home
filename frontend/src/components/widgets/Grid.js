import { useState } from 'react';

import Groceries from './Groceries/Groceries';
import PollWidget from './Polling/PollsWidget';
import RecipeFinal from './Recipes/RecipeFinal';
import GalleryModal from './Photos/GalleryModal';
import CalendarWidget from './Calendar/CalendarWidget';
import Chore from './Chores/Chore';

const Grid = () => {
	const [groceries, setGroceries] = useState([]);

	return (
		<div id="grid-wrapper">
			<CalendarWidget />
			<Groceries groceries={groceries} setGroceries={setGroceries} />
			<RecipeFinal setGroceries={setGroceries} />
			<GalleryModal />
			<PollWidget />
			<Chore />
		</div>
	);
};

export default Grid;
