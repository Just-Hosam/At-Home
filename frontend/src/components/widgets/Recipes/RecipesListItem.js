import React from 'react';

export default function RecipesListItem(props) {
	return (
		<div
			className="recipe-min"
			onClick={() => props.handleView('RECIPE_SHOW', props.recipeId)}
		>
			<div className="recipe-details">
				<p>{props.title}</p>
				<div className="recipe-time">
					<i className="far fa-clock"></i>
					<span>{props.time}</span>
				</div>
			</div>
			<img src={props.img_url} alt={props.title} />
		</div>
	);
}
