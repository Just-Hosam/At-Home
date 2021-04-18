import Groceries from './Groceries/Groceries';
import PollWidget from './Polling/PollsWidget';
import RecipeFinal from './Recipes/RecipeFinal';
// import RecipeMax from './widgets/Recipes/RecipeMax';
import GalleryModal from './Photos/GalleryModal';
import CalendarWidget from './Calendar/CalendarWidget';

const Grid = () => {



	return (
		<div id="grid-wrapper">
			<CalendarWidget />
			<Groceries />
			<RecipeFinal />
			<GalleryModal />
			<PollWidget />
			<div id="chores-grid-widget">Chores</div>
		</div>
	);
};


export default Grid;
