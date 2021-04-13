import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function RecipeEdit(props) {
	const dashboardId = props.dashboardId; // TODO: needs useContext
	const recipeId = 1;

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
	}, [dashboardId]);

	const ingredientsList = ingredients.map((elem) => {
		return (
			<li key={elem.id}>
				<input
					type="text"
					value={elem.measurement}
					onChange={(event) => {
						updateIngredient('measurement', event.target.value, elem.id);
					}}
				/>
				<input
					type="text"
					value={elem.item}
					onChange={(event) => {
						updateIngredient('item', event.target.value, elem.id);
					}}
				/>
				<button onClick={() => deleteIngredient(elem.id)}>
					<i className="fas fa-trash"></i>
				</button>
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
			.then(() => {}) // transition to full recipe.
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
						<input
							type="text"
							value={newIng.measurement}
							onChange={(event) => {
								updateIngredient('measurement', event.target.value, newIng.id);
							}}
						/>
						<input
							type="text"
							value={newIng.item}
							onChange={(event) => {
								updateIngredient('item', event.target.value, newIng.id);
							}}
						/>
						<button onClick={() => deleteIngredient(newIng.id)}>
							<i className="fas fa-trash"></i>
						</button>
					</li>
				);
				ingredientsList.push(newEmptyFields);
			});
	};
	

	return (
		<div>
			<h3>Edit:</h3>
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
					<ul>{ingredientsList}</ul>
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
				<button onClick={() => props.handleView('SHOW')}>Cancel</button>
				<button
					onClick={() => {
						submitState(dashboardId, recipe);
						props.handleView('SHOW');
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
}
