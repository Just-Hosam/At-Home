import Groceries from './Groceries/Groceries';
import PollWidget from './Polling/PollsWidget';
import RecipeFinal from './Recipes/RecipeFinal';
// import RecipeMax from './widgets/Recipes/RecipeMax';
import GalleryModal from './Photos/GalleryModal';
<<<<<<< HEAD
import Chores from './Chores/Chores';
// import Gallery from './Gallery';
=======
>>>>>>> main
import CalendarWidget from './Calendar/CalendarWidget';

const Grid = () => {



<<<<<<< HEAD
	<div id='recipes-grid-widget' className="widget3"><RecipesMin/></div>

	<div id='gallery-grid-widget' className="widget4"><GalleryModal/></div>

	<div id='chores-grid-widget' className="widget5"><Chores/></div>
	
	<div id='polls-grid-widget' className="widget6"><PollWidget/></div>

</div>

</div>

</div>;


}






	
=======
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
>>>>>>> main


export default Grid;
