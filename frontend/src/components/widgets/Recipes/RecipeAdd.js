import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default function RecipeAdd(props) {
	const dashboardId = props.dashboardId; // TODO: needs useContext

	const [ingredients, setIngredients] = useState([
		{
			tempId: 0,
			item: '',
			measurement: '',
		},
	]);
	const [recipe, setRecipe] = useState({
		id: 0,
		dashboard_id: 0,
		title: '',
		directions: '',
		time: '',
		img_url: '',
		ingredients,
	});

	const updateRecipe = (kind, value) => {
		setRecipe((prev) => {
			return { ...prev, [kind]: value };
		});
	};

	const updateIngredient = (kind, value, tempId) => {
		setIngredients((prev) => {
			const copy = prev.map((elem) => {
				if (elem.tempId === tempId) {
					return { ...elem, [kind]: value };
				}
				return elem;
			});
			setRecipe((prev) => {
				return { ...prev, ingredients: [...copy] };
			});
			return copy;
		});
	};

	const ingredientsFieldsList = ingredients.map((elem) => {
		return (
			<li key={elem.tempId}>
				<TextField
					className="recipes-add-textfield"
					label="Measurement"
					variant="outlined"
					size="small"
					value={elem.measurement}
					onChange={(event) => {
						updateIngredient('measurement', event.target.value, elem.tempId);
					}}
				/>
				<TextField
					className="recipes-add-textfield recipes-add-item"
					label="Item"
					variant="outlined"
					size="small"
					value={elem.item}
					onChange={(event) => {
						updateIngredient('item', event.target.value, elem.tempId);
					}}
				/>
				<IconButton
					className="recipes-add-deletebtn"
					onClick={() => deleteIngredient(elem.tempId)}
				>
					<DeleteIcon />
				</IconButton>
			</li>
		);
	});

	const addIngredient = () => {
		setIngredients((prev) => {
			const tempId = prev[prev.length - 1].tempId + 1;
			const copy = [
				...prev,
				{
					tempId,
					item: '',
					measurement: '',
				},
			];
			setRecipe((prev) => {
				return { ...prev, ingredients: [...copy] };
			});
			return copy;
		});
	};

	const deleteIngredient = (id) => {
		setIngredients((prev) => {
			const copy = [...prev];
			copy.forEach((elem, index) => {
				if (elem.tempId === id) copy.splice(index, 1);
			});
			setRecipe((prev) => {
				return { ...prev, ingredients: [...copy] };
			});
			return [...copy];
		});
	};

	const submitRecipe = (dashboardId, inputRecipe) => {
		axios
			.post(`/dashboards/${dashboardId}/recipes/`, inputRecipe)
			.then((res) => {
				props.handleView('');
				return res;
			});
	};

	return (
		<div id="recipes-add">
			<h2>New Recipe</h2>
			<form onSubmit={(event) => event.preventDefault()}>
				<div id="recipes-add-header">
					<TextField
						className="recipes-add-textfield"
						fullWidth
						label="Title"
						variant="outlined"
						value={recipe.title}
						size="small"
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
					<ul>{ingredientsFieldsList}</ul>
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
						onClick={() => props.handleView('')}
					>
						Cancel
					</Button>
					<Button
						className="finalbtns submission"
						variant="contained"
						onClick={() => {
							submitRecipe(dashboardId, recipe);
						}}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}
