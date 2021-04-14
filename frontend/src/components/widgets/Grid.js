import Groceries from './Groceries/Groceries';
import Dropdown from './Dropdown/Dropdown';
import PollWidget from './Polling/PollsWidget';
import RecipesMin from './Recipes/RecipesMin';
// import RecipeMax from './widgets/Recipes/RecipeMax';
import GalleryModal from './GalleryModal';
// import Photos from './Photos';
// import Gallery from './Gallery';
import CalendarWidget from './Calendar/CalendarWidget';

const Grid = () => {
return <div className="grid-wrapper">

<Dropdown/>
	
<div className='grid-stage'>

<div className="grid-container">
	
	<div id='calendar-grid-widget' className="widget1"><CalendarWidget/></div>
	
	<div id='groceries-grid-widget' className="widget2"><Groceries/></div> 

	<div id='recipes-grid-widget' className="widget3"><RecipesMin/></div>

	<div id='gallery-grid-widget' className="widget4"><GalleryModal/></div>

	<div id='chores-grid-widget' className="widget5">Chores</div>
	
	<div id='polls-grid-widget' className="widget6"><PollWidget/></div>

</div>

</div>

</div>;


}






	


export default Grid;
