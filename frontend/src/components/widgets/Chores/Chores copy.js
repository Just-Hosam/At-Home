import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "../Misc/Chip";
import ListHeader from "../Misc/ListHeader";

const usersOnDashDummy = [
  { user_id: 1, first_name: "King", last_name: "Andy" },
  { user_id: 2, first_name: "Darth", last_name: "Vader" },
  { user_id: 3, first_name: "Kylo", last_name: "Ren" },
  { user_id: 4, first_name: "Bobba", last_name: "Fett" },
  { user_id: 5, first_name: "Din", last_name: "Djarin" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    backgroundColor: theme.palette.background.paper,
  },
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
        setDashboardUsers(usersOnDashDummy);
        // setAssigned((prev) => {
        //   return res.data.map((elem) => elem.name);
        // });
        // axios
        // .get(`/dashboards/${dashboardId}/users`)
        // .then((res) => {
        // setDashboardUsers(res.data);
        // })
      })
      .catch((err) => console.log("CHORES COMPONENT ERROR", err));
  }, []);

  const handleToggle = (value) => () => {
			console.log(`value`, value)	
		const newStupidAssBrokenValue = {...value, done: !value.done}
			console.log(`newStupidAssBrokenValue`, newStupidAssBrokenValue)
			
    const currentIndex = checked.indexOf(value);
			// console.log(`currentIndex`, currentIndex)

    const newChecked = [...checked];
			// console.log(`checked`, checked)
			console.log(`newChecked`, newChecked)

    if (currentIndex === -1 /* && !obj.done */) {
      newChecked.push(value);
			console.log('Task complete')
			// change obj.done to true
    } else {
			newChecked.splice(currentIndex, 1);
			console.log('Task incomplete')
			// change obj.done to false
    }

    setChecked(newChecked);
  };
	
	console.log(`checked`, checked)
	// console.log(`checked`, checked)

  // form input
  const [assigned, setAssigned] = useState({});

	const updateChore = (dashboardId, chore) => {
		axios
			.patch(`/dashboards/${dashboardId}/chores/${chore.id}`, chore)
			.then(() => {})
			.catch((err) => console.log('ERROR UPDATING CHORE', err));
	};

  const handleChange = (event, choreId) => {
    const eTarget = event.target.value;
    setChoresList((prev) => {
      // console.log(`prev`, prev);
      const prevMap = prev.map((elem) => {
        if (elem.id === choreId) {
          const newElem = { ...elem, name: eTarget };
          // console.log(`newElem`, newElem);
          setAssigned(newElem);
					updateChore(dashboardId, newElem);
          return newElem;
        }
        return elem;
      });
      // console.log(`prevMap`, prevMap);
      return prevMap;
    });
    // setAssigned(eTarget);
  };
	// console.log(`assigned`, assigned);
  // console.log(`choresList`, choresList);

  return (
    <div className={classes.root}>
      <ListHeader key="TODO" size="h4" title="TODO" />
      <Divider variant="middle" />
      <List className={null}>
        {choresList.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          // Conditional rendering for the Chip/Completed Checkmark/User Selector
          // SecondarySwitcher : switches between chip & user selector
          // SecondaryElement  : toggles completed checkmark
          let secondarySwitcher;
          let secondaryElement;

          if (value.name === "none") {
            secondarySwitcher = (
              <FormControl size="small" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Users</InputLabel>
                <Select
                  key={value.id}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={''}
                  defaultValue=""
                  onChange={(e) => handleChange(e, value.id)}
                >
                  {dashboardUsers.map((user) => {
                    return (
                      <MenuItem value={`${user.first_name} ${user.last_name}`}>
                        {`${user.first_name} ${user.last_name}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            );
          } else {
            if (checked.includes(value)) {
              secondaryElement = (
                <IconButton edge="end" aria-label="done">
                  <DoneIcon />
                </IconButton>
              );
            }
            secondarySwitcher = (
              <Chip name={String(value.name.split(" ").splice(0, 1))} />
            );
          }

          return (
            <>
              <ListItem
                key={value.id}
                role={undefined}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      onClick={handleToggle(value)}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.text}`} />
                </div>
                <div>
                  <ListItemSecondaryAction>
                    {secondarySwitcher}
                    {secondaryElement}
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
