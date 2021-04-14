import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
	// input form
	formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CheckboxList() {
	// check list
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

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
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <List className={classes.root}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />																							{/* LIST ITEM VALUE */}
            <ListItemSecondaryAction>
              {checked.includes(value) && <IconButton edge="end" aria-label="done">
                <DoneIcon />																																															{/* COMPLETE CHECKMARK */}
              </IconButton>}
							{!checked.includes(value) && <FormControl className={classes.formControl}>																	{/* DROP DOWN LIST */}
								<InputLabel id="demo-simple-select-label">Age</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={age}
									onChange={handleChange}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}



// import React, { useState, useEffect } from 'react';

// import Chore from './Chore';

// const axios = require('axios');

// export default function Chores() {
// 	const dashboardId = 1; // TODO: needs useContext

// 	const [groceries, setGroceries] = useState([]);
// 	const [input, setInput] = useState('');

// 	useEffect(() => {
// 		axios
// 			.get(`/dashboards/${dashboardId}/groceries/`)
// 			.then((res) => setGroceries(res.data))
// 			.catch((err) => console.log('I AM A COMPONENT ERROR', err));
// 	}, []);

// 	const toggleGrocery = (dashboardId, groceryId) => {
// 		axios
// 			.patch(`/dashboards/${dashboardId}/groceries/${groceryId}`)
// 			.then(() => {
// 				const newGroceriesArr = groceries.map((elem) =>
// 					elem.id === groceryId ? { ...elem, done: !elem.done } : elem
// 				);
// 				setGroceries([...newGroceriesArr]);
// 			})
// 			.catch((err) => console.log('I"M THE PATCH MONSTER', err));
// 	};

// 	const addGrocery = (inputGrocery) => {
// 		axios
// 			.post(`/dashboards/${dashboardId}/groceries/`, { inputGrocery })
// 			.then((res) => {
// 				setGroceries([res.data, ...groceries]);
// 				setInput('');
// 			})
// 			.catch((err) => console.log('I"M THE POST MONSTER', err));
// 	};

// 	const unCheckedList = groceries.filter((grocery) => !grocery.done);
// 	const checkedList = groceries.filter((grocery) => grocery.done);

// 	const unCheckedComponents = unCheckedList.map((grocery) => (
// 		<Chore
// 			key={grocery.id}
// 			itemId={grocery.id}
// 			item={grocery.text}
// 			onClick={toggleGrocery}
// 			dashboardId={dashboardId}
// 		/>
// 	));
// 	const checkedComponents = checkedList.map((grocery) => (
// 		<Chore
// 			key={grocery.id}
// 			itemId={grocery.id}
// 			item={grocery.text}
// 			onClick={toggleGrocery}
// 			dashboardId={dashboardId}
// 		/>
// 	));

// 	return (
// 		<div id="widget-groceries">
// 			<h1>Groceries</h1>
// 			<form id="input-groceries" onSubmit={(event) => event.preventDefault()}>
// 				<input
// 					value={input}
// 					onChange={(event) => setInput(event.target.value)}
// 					type="text"
// 				/>
// 				<button onClick={() => addGrocery(input)}>Hello</button>
// 			</form>
// 			{unCheckedList.length > 0 && unCheckedComponents}
// 			<p>checked list</p>
// 			{checkedList.length > 0 && checkedComponents}
// 		</div>
// 	);
// }
