import React from 'react';

export default function RecipesListItem(props) {
	const handleItemClick = () => {
		props.handleView('RECIPE_SHOW', props.recipeId);
		props.handleOpen();
	};

	return (
		<li className="recipe-min-item" onClick={() => handleItemClick()}>
			<div className="recipe-list-details">
				<p>{props.title}</p>
				<div className="recipe-time">
					<i className="far fa-clock"></i>
					<span>{props.time}</span>
				</div>
			</div>
			<div className="recipe-list-img-container">
				<img src={props.img_url} alt={props.title} />
			</div>
		</li>
	);
}
