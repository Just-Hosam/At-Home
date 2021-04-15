import React from 'react';

export default function RecipesListItem(props) {
	return (
		<li
			className="recipe-min-item"
			onClick={() => props.handleView('RECIPE_SHOW', props.recipeId)}
		>
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
