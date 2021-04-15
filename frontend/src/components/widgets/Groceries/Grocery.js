import React from 'react';

import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';

export default function Grocery(props) {
	let classes = 'grocery-item';
	classes += props.isDone ? ' grocery-completed' : '';
	return (
		<li className={classes}>
			<p>{props.item}</p>
			<IconButton
				className="grocery-check-icon"
				aria-label="add"
				onClick={() => props.onClick(props.dashboardId, props.itemId)}
			>
				<CheckIcon />
			</IconButton>
		</li>
	);
}
