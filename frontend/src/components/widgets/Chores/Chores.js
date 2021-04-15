import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '../Misc/Chip';

const usersOnDashDummy = [
	{user_id: 1, first_name: 'Shooter', last_name: 'McGavin'},
	{user_id: 2, first_name: 'Happy', last_name: 'Gilmore'},
	{user_id: 3, first_name: 'Darth', last_name: 'Vader'},
	{user_id: 4, first_name: 'Kylo', last_name: 'Ren'},
	{user_id: 5, first_name: 'Bobba', last_name: 'Fett'},
	{user_id: 6, first_name: 'Din', last_name: 'Djarin'},
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px',
    // maxWidth: 1200,
		// flexDirection: 'row',
    backgroundColor: theme.palette.background.paper,
  },
	choresHeader: {
		marginTop: theme.spacing(1),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		textAlign: 'center',
		minWidth: 120,
		backgroundColor: theme.palette.background.paper,
	},
	// // input form
	formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Chores() {
	const dashboardId = 1;
	const [choresList, setChoresList] = useState([]);
	// check list
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [dashboardUsers, setDashboardUsers] = useState([]);

	useEffect(() => {
    axios
      .get(`/dashboards/${dashboardId}/chores/`)
      .then((res) => {
        setChoresList(res.data);
				setAssigned((prev) => {
					return res.data.map((elem) => elem.name)
				});
				setDashboardUsers(usersOnDashDummy);
				// axios
					// .get(`/dashboards/${dashboardId}/users`)
					// .then((res) => {
						// setDashboardUsers(res.data);
					// })
      })
      .catch((err) => console.log("CHORES COMPONENT ERROR", err));
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

	// form input
  const [assigned, setAssigned] = useState(['none']);

  const handleChange = (event, choreId) => {
		const eTarget = event.target.value;
		console.log(`choreId`, choreId);
		setChoresList((prev) => {
			return prev.map((elem) => {
				if (elem.id === choreId) {
					return {...elem, name: eTarget}
				}
				return elem;
			});
		});
    setAssigned(eTarget);
  };
	console.log(`assigned`, assigned)

  return (
		<div className={classes.root}>
			<Grid container className={classes.choresHeader}>
				<Grid item xs>
					<Typography variant="h5">
						To-Do
					</Typography>
				</Grid>
			</Grid>
			<Divider variant="middle" />
			<List className={null}>
				{choresList.map((value) => {
					console.log(`assigned`, assigned)
					const labelId = `checkbox-list-label-${value.id}`;

					return (
						<>
							<ListItem key={value.id} role={undefined} style={{display: 'flex', justifyContent: 'space-between'}}>
								<div style={{display: 'flex', alignItems: 'center'}}>
									<ListItemIcon>
										<Checkbox
											edge="start"
											checked={checked.indexOf(value) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{ 'aria-labelledby': labelId }}
											onClick={handleToggle(value)}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={`${value.text}`} />
								</div>
								{!value.name === 'none' ? null : <Chip name={value.name} />}
								<div>
									<ListItemSecondaryAction>
											{checked.includes(value) && <IconButton edge="end" aria-label="done">
												<DoneIcon />
											</IconButton>}
											{!checked.includes(value) && <FormControl size="small" className={classes.formControl}>
												<InputLabel id="demo-simple-select-label">Users</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={''}
													// onChange={handleChange}
													onChange={(e) => handleChange(e, value.id)}
												>
													{dashboardUsers.map((user) => <MenuItem value={`${user.first_name} ${user.last_name}`}>{`${user.first_name} ${user.last_name}`}</MenuItem>)}
												</Select>
											</FormControl>}
									</ListItemSecondaryAction>
								</div>
							</ListItem>
							<Divider />
						</>
					);
				})}
			</List>
		</div>
  );
}
