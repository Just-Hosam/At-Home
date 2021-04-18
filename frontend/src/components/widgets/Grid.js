import Groceries from './Groceries/Groceries';
import PollWidget from './Polling/PollsWidget';
import RecipeFinal from './Recipes/RecipeFinal';
// import RecipeMax from './widgets/Recipes/RecipeMax';
import GalleryModal from './Photos/GalleryModal';
import CalendarWidget from './Calendar/CalendarWidget';
import Chore from './Chores/Chore';

const Grid = () => {



	return (
		<div id="grid-wrapper">
			<CalendarWidget />
			<Groceries />
			<RecipeFinal />
			<GalleryModal />
			<PollWidget />
			<Chore />
		</div>
	);
};


export default Grid;
