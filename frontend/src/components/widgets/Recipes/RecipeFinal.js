import React, { useState } from 'react';

import RecipeMin from './RecipesMin';
import RecipeMax from './RecipeMax';
import RecipeAdd from './RecipeAdd';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: 10,
		boxShadow: theme.shadows[5],
		outline: 'none',
	},
}));

export default function RecipeFinal(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const [recipes, setRecipes] = useState([]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [modalView, setModalView] = useState('');
	const [itemId, setItemId] = useState(0);

	const handleView = (newView, id) => {
		setModalView(newView);
		setItemId(id);
	};

	return (
		<div id="recipes-final">
			<RecipeMin
				recipes={recipes}
				setRecipes={setRecipes}
				handleView={handleView}
				handleOpen={handleOpen}
			/>
			<Modal
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						{modalView === 'RECIPE_SHOW' && (
							<RecipeMax
								recipeId={itemId}
								handleClose={handleClose}
								handleView={handleView}
								setGroceries={props.setGroceries}
								setRecipes={setRecipes}
							/>
						)}
						{modalView === 'RECIPE_ADD' && (
							<RecipeAdd
								setRecipes={setRecipes}
								handleClose={handleClose}
								handleView={handleView}
							/>
						)}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
