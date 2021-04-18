import React, { useEffect } from 'react';
import axios from 'axios';
import Chip from '../Misc/Chip';

import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

export default function Chores(props) {
  const dashboardId = 1;
  const classes = useStyles();
  const parentUsers = [...props.choreState.dashboardUsers];
  const setParentUsers = props.choreState.setDashboardUsers;
  const parentChores = [...props.choreState.choresList];
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
        setParentProgress({ ...parentProgress, total: res.data.length });
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
        setParentDone(parentChores.filter((elem) => elem.done));
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
    setParentChores((prev) => {
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
    setParentChores((prev) => {
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

  let trophy = null;

  if (parentDone.length === parentChores.length) {
    trophy = <i class="fas fa-trophy fa-3x" style={{color: 'rgb(96, 83, 247)'}}></i>;
  }

  return (
    <div className={classes.root}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {trophy}
      </div>
      <List className={null}>
        {parentChores.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          // Conditional rendering for ListIem
          // PrimaryElement : entire line item component
          // Conditional rendering for the Chip/Completed Checkmark/User Selector
          // SecondarySwitcher : switches between chip & user selector
          // SecondaryElement  : toggles completed checkmark
          let primaryElement = null;
          let secondarySwitcher = null;
          let secondaryElement = null;

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
                  {parentUsers.map((user) => {
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
            secondarySwitcher = (
              <Chip
                name={String(value.name.split(' ').splice(0, 1))}
                chipValue={value}
                clearChip={clearChip}
              />
            );
          }

          if (!value.done) {
            primaryElement = (
              <>
                <ListItem
                  key={value.id}
                  role={undefined}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon>
                      {value.name !== 'none' ? 
                      <Checkbox
                        // edge="start"
                        checked={value.done}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={handleToggle(value)}
                      /> : null}
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
          }

          return (
          <>
            {primaryElement}
          </>
          );
        })}
      </List>
    </div>
  );
}
