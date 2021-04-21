import React, { useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

export default function DoneChores(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;
	// const parentUsers = [...props.choreState.dashboardUsers];
	const setParentUsers = props.choreState.setDashboardUsers;
	// const parentChores = [...props.choreState.choresList];
	const setParentChores = props.choreState.setChoresList;
	const parentDone = [...props.choreState.doneList];
	const setParentDone = props.choreState.setDoneList;
	const parentProgress = { ...props.choreState.progress };
	const setParentProgress = props.choreState.setProgress;

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/chores/`)
			.then((res) => {
				setParentChores(res.data);
				setParentDone(res.data.filter((elem) => elem.done));

				axios.get(`/dashboards/${dashboardId}/users`).then((res) => {
					setParentUsers(res.data);
				});
			})
			.catch((err) => console.log('CHORES COMPONENT ERROR', err));
	}, []);

	const handleToggle = (value) => () => {
		value.done = !value.done;
		axios
			.patch(`/dashboards/${dashboardId}/chores/${value.id}`, value)
			.then((res) => {
				setParentChores((prev) => {
					return prev.map((elem) => {
						if (elem.id === value.id) return res.data;
						return elem;
					});
				});
			})
			.then(() => {
				const newDone = [...parentDone];
				setParentDone(newDone.filter((elem) => elem.done));
			})
			.catch((err) => console.log('handleToggle ERROR', err));
	};

	return (
		<div className="chore-item chore-completed">
			<List className={null}>
				{parentDone.map((value) => {
					const labelId = `checkbox-list-label-${value.id}`;
					// Conditional rendering for ListIem
					// PrimaryElement : entire line item component
					// Conditional rendering for the Completed Checkmark
					// SecondaryElement  : toggles completed checkmark
					let primaryElement = null;
					let secondaryElement = null;

					if (value.done) {
						secondaryElement = (
							<IconButton
								edge="end"
								aria-label="done"
								className="chore-check-icon"
							>
								<DoneIcon />
							</IconButton>
						);

						primaryElement = (
							<>
								<ListItem
									role={undefined}
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<ListItemIcon>
											<ClearIcon
												checked={value.done}
												className="chore-clear-icon"
												onClick={handleToggle(value)}
											/>
										</ListItemIcon>
										<ListItemText id={labelId} primary={`${value.text}`} />
									</div>
									<div>
										<ListItemSecondaryAction>
											<div style={{ display: 'flex', alignItems: 'center' }}>
												{secondaryElement}
											</div>
										</ListItemSecondaryAction>
									</div>
								</ListItem>
							</>
						);
					}

					return <div key={value.id}>{primaryElement}</div>;
				})}
			</List>
		</div>
	);
}
