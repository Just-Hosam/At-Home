import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function RecipeEdit(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;
	const recipeId = props.recipeId;

	const [ingredients, setIngredients] = useState([]);
	const [recipe, setRecipe] = useState({
		id: 0,
		dashboard_id: 0,
		title: '',
		directions: '',
		time: '',
		img_url: '',
		ingredients: [],
	});

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/recipes/${recipeId}`)
			.then((res) => {
				setRecipe(res.data);
				setIngredients(res.data.ingredients);
			})
			.catch((err) => console.log('Error getting recipe', err));
	}, [dashboardId, recipeId]);

	const ingredientsList = ingredients.map((elem) => {
		return (
			<li key={elem.id}>
				<TextField
					className="recipes-add-textfield"
					label="Measurement"
					variant="outlined"
					size="small"
					value={elem.measurement}
					onChange={(event) => {
						updateIngredient('measurement', event.target.value, elem.id);
					}}
				/>
				<TextField
					className="recipes-add-textfield recipes-add-item"
					label="Item"
					variant="outlined"
					size="small"
					value={elem.item}
					onChange={(event) => {
						updateIngredient('item', event.target.value, elem.id);
					}}
				/>
				<IconButton
					className="recipes-add-deletebtn"
					onClick={() => deleteIngredient(elem.id)}
				>
					<DeleteIcon />
				</IconButton>
			</li>
		);
	});

	const deleteIngredient = (ingId) => {
		axios
			.delete(
				`/dashboards/${dashboardId}/recipes/${recipeId}/ingredients/${ingId}`
			)
			.then(() => {
				setIngredients((prev) => {
					const copy = [...prev];
					copy.forEach((elem, index) => {
						if (elem.id === ingId) copy.splice(index, 1);
					});
					setRecipe((prev) => {
						return { ...prev, ingredients: [...copy] };
					});
					return [...copy];
				});
			})
			.catch((err) => console.log('Error deleting an ingredient', err));
	};

	const updateRecipe = (kind, value) => {
		setRecipe((prev) => {
			return { ...prev, [kind]: value };
		});
	};

	const updateIngredient = (kind, value, ingId) => {
		setIngredients((prev) => {
			const copy = prev.map((elem) => {
				if (elem.id === ingId) {
					return { ...elem, [kind]: value };
				}
				return elem;
			});
			setRecipe((prev) => {
				return { ...prev, ingredients: copy };
			});
			return copy;
		});
	};

	const submitState = (dashboardId, recipe) => {
		axios
			.patch(`/dashboards/${dashboardId}/recipes/${recipe.id}`, recipe)
			.then(() => {
				props.handleEdit('SHOW');
				// props.handleClose();
			})
			.catch((err) => console.log('hi', err));
	};

	const addIngredient = () => {
		axios
			.post(`/dashboards/${dashboardId}/recipes/${recipeId}/ingredients/`)
			.then((res) => {
				const newIng = res.data.rows[0];
				setIngredients((prev) => [...prev, newIng]);
				setRecipe((prev) => {
					return { ...prev, ingredients: [...ingredients, newIng] };
				});
				const newEmptyFields = (
					<li key={newIng.id}>
						<TextField
							className="recipes-add-textfield"
							label="Measurement"
							variant="outlined"
							size="small"
							value={newIng.measurement}
							onChange={(event) => {
								updateIngredient('measurement', event.target.value, newIng.id);
							}}
						/>
						<TextField
							className="recipes-add-textfield recipes-add-item"
							label="Item"
							variant="outlined"
							size="small"
							value={newIng.item}
							onChange={(event) => {
								updateIngredient('item', event.target.value, newIng.id);
							}}
						/>
						<IconButton
							className="recipes-add-deletebtn"
							onClick={() => deleteIngredient(newIng.id)}
						>
							<DeleteIcon />
						</IconButton>
					</li>
				);
				ingredientsList.push(newEmptyFields);
			});
	};

	return (
		<div id="recipes-add">
			<h2>Edit Recipe</h2>
			<form onSubmit={(event) => event.preventDefault()}>
				<div id="recipes-add-header">
					<TextField
						className="recipes-add-textfield"
						fullWidth
						label="Title"
						variant="outlined"
						size="small"
						value={recipe.title}
						onChange={(event) => updateRecipe('title', event.target.value)}
					/>
					<div id="recipes-add-time">
						<TextField
							className="recipes-add-textfield"
							label="Time"
							variant="outlined"
							size="small"
							value={recipe.time}
							onChange={(event) => updateRecipe('time', event.target.value)}
						/>
					</div>
				</div>
				<TextField
					className="recipes-add-textfield"
					fullWidth
					label="Image"
					variant="outlined"
					size="small"
					value={recipe.img_url}
					onChange={(event) => updateRecipe('img_url', event.target.value)}
				/>
				<h3>Ingredients:</h3>
				<div id="recipes-add-ing">
					<ul>{ingredientsList}</ul>
					<div className="recipes-add-addcont">
						<IconButton className="recipes-add-addbtn" onClick={addIngredient}>
							<AddCircleIcon fontSize="large" />
						</IconButton>
					</div>
				</div>
				<TextField
					className="recipes-add-textfield recipes-add-multi"
					fullWidth
					label="Directions"
					variant="outlined"
					rows={4}
					multiline
					value={recipe.directions}
					onChange={(event) => updateRecipe('directions', event.target.value)}
				/>
				<div id="recipes-add-finalbtns">
					<Button
						className="finalbtns"
						variant="contained"
						onClick={() => props.handleEdit('SHOW')}
					>
						Cancel
					</Button>
					<Button
						className="finalbtns submission"
						variant="contained"
						onClick={() => {
							submitState(dashboardId, recipe);
							props.handleEdit('LOADING');
						}}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}
