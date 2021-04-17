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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '../Misc/Chip';
import ListHeader from '../Misc/ListHeader';
import AddChore from './AddChore';
import ProgressBar from '../Misc/ProgressBar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Chores() {
  const dashboardId = 1;
  const classes = useStyles();
  const [choresList, setChoresList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [dashboardUsers, setDashboardUsers] = useState([]);
  const [progress, setProgress] = useState({
    total: 0,
    current: 0,
  });

  useEffect(() => {
    axios
      .get(`/dashboards/${dashboardId}/chores/`)
      .then((res) => {
        setChoresList(res.data);
        setProgress({ ...progress, total: res.data.length });
        setDoneList(res.data.filter((elem) => elem.done));
        axios.get(`/dashboards/${dashboardId}/users`).then((res) => {
          setDashboardUsers(res.data);
        });
      })
      .catch((err) => console.log('CHORES COMPONENT ERROR', err));
  }, []);

  const handleToggle = (value) => () => {
    value.done = !value.done;
    axios
      .patch(`/dashboards/${dashboardId}/chores/${value.id}`, value)
      .then((res) => {
        setChoresList((prev) => {
          return prev.map((elem) => {
            if (elem.id === value.id) return res.data;
            return elem;
          });
        });
      })
      .then(() => {
        setDoneList(choresList.filter((elem) => elem.done));
      })
      .catch((err) => console.log('handleToggle ERROR', err));
  };

  const updateChore = (dashboardId, chore) => {
    axios
      .patch(`/dashboards/${dashboardId}/chores/${chore.id}`, chore)
      .then(() => {})
      .catch((err) => console.log('ERROR UPDATING CHORE', err));
  };

  const clearChip = (chip) => {
    setChoresList((prev) => {
      return prev.map((elem) => {
        if (elem.id === chip.id) {
          return { ...elem, name: 'none' };
        }
        return elem;
      });
    });
  };

  const handleChange = (event, choreId) => {
    const eTarget = event.target.value;
    setChoresList((prev) => {
      const prevMap = prev.map((elem) => {
        if (elem.id === choreId) {
          const newElem = { ...elem, name: eTarget };
          updateChore(dashboardId, newElem);
          return newElem;
        }
        return elem;
      });
      return prevMap;
    });
  };

  return (
    <div className={classes.root}>
      <ListHeader key="TODO" size="h4" title="TODO" />
      <AddChore choresList={choresList} setChoresList={setChoresList} />
      <ProgressBar choresList={choresList} doneList={doneList} />
      <List className={null}>
        {choresList.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          // Conditional rendering for the Chip/Completed Checkmark/User Selector
          // SecondarySwitcher : switches between chip & user selector
          // SecondaryElement  : toggles completed checkmark
          let secondarySwitcher;
          let secondaryElement;

          if (value.name === 'none') {
            secondarySwitcher = (
              <FormControl size="small" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Users</InputLabel>
                <Select
                  key={value.id}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
            if (value.done) {
              secondaryElement = (
                <IconButton edge="end" aria-label="done">
                  <DoneIcon />
                </IconButton>
              );
            }
          } else {
            if (value.done) {
              secondaryElement = (
                <IconButton edge="end" aria-label="done">
                  <DoneIcon />
                </IconButton>
              );
            }
            secondarySwitcher = (
              <Chip
                name={String(value.name.split(' ').splice(0, 1))}
                chipValue={value}
                clearChip={clearChip}
              />
            );
          }

          return (
            <>
              <ListItem
                key={value.id}
                role={undefined}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <Checkbox
                      // edge="start"
                      checked={value.done}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={handleToggle(value)}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.text}`} />
                </div>
                <div>
                  <ListItemSecondaryAction>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {secondarySwitcher}
                      {secondaryElement}
                    </div>
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
