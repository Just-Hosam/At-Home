import Groceries from './Groceries/Groceries';
import PollWidget from './Polling/PollsWidget';
import RecipesMin from './Recipes/RecipesMin';
// import RecipeMax from './widgets/Recipes/RecipeMax';
import GalleryModal from './Photos/GalleryModal';
// import Photos from './Photos';
// import Gallery from './Gallery';
import CalendarWidget from './Calendar/CalendarWidget';

const Grid = () => {
	return (
		<div id="grid-wrapper">
			<div id="calendar-grid-widget">
				<CalendarWidget />
			</div>

			<div id="groceries-grid-widget">
				<Groceries />
			</div>
			<div id="gallery-grid-widget">
				<GalleryModal />
			</div>
			<div id="recipes-grid-widget">
				<RecipesMin />
			</div>
			<div id="polls-grid-widget">
				<PollWidget />
			</div>
			<div id="chores-grid-widget">Chores</div>
		</div>
	);
};

export default Grid;
