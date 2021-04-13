import axios from 'axios';
import React, { useState } from 'react';

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
				<input
					type="text"
					value={elem.measurement}
					onChange={(event) => {
						updateIngredient('measurement', event.target.value, elem.tempId);
					}}
				/>
				<input
					type="text"
					value={elem.item}
					onChange={(event) => {
						updateIngredient('item', event.target.value, elem.tempId);
					}}
				/>
				<button onClick={() => deleteIngredient(elem.tempId)}>
					<i className="fas fa-trash"></i>
				</button>
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
			.then((res) => res);
	};

	return (
		<div>
			<h3>Add:</h3>
			<form onSubmit={(event) => event.preventDefault()}>
				<div>
					<label>Title:</label>
					<input
						type="text"
						value={recipe.title}
						onChange={(event) => updateRecipe('title', event.target.value)}
					/>
				</div>
				<div>
					<label>Time:</label>
					<input
						type="text"
						value={recipe.time}
						onChange={(event) => updateRecipe('time', event.target.value)}
					/>
				</div>
				<div>
					<label>URL:</label>
					<input
						type="url"
						value={recipe.img_url}
						onChange={(event) => updateRecipe('img_url', event.target.value)}
					/>
				</div>
				<div>
					<ul>{ingredientsFieldsList}</ul>
					<button onClick={addIngredient}>add ingredient</button>
				</div>
				<div>
					<label>Directions:</label>
					<input
						type="text"
						value={recipe.directions}
						onChange={(event) => updateRecipe('directions', event.target.value)}
					/>
				</div>
				<button>Cancel</button>
				<button
					onClick={() => {
						submitRecipe(dashboardId, recipe);
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
}
