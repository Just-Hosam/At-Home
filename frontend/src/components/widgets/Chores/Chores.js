import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Chip from '../Misc/Chip';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function Chores(props) {
  const [cookies] = useCookies(['userID']);
  const dashboardId = cookies.dashboardId;
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
      .then((res) => {
        setParentDone(parentChores.filter((elem) => elem.done));
      })
      .then(() => {
        setParentProgress({ ...parentProgress, current: parentDone.length });
      })
      .catch((err) => console.log('handleToggle ERROR', err));
  };

  const updateChore = (dashboardId, chore) => {
    axios
      .patch(`/dashboards/${dashboardId}/chores/${chore.id}`, chore)
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
    trophy = (
      <i
        id="chores-trophy"
        className="fas fa-trophy fa-3x"
      ></i>
    );
  } else {
    trophy = null;
  }

  return (
    <div className="chore-item">
      <div style={{ display: 'flex', justifyContent: 'center' }}>{trophy}</div>
      <List>
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
              <FormControl size="small" className="chore-selector" variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Users</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
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
              <div>
                <ListItem
                  role={undefined}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon>
                        <Checkbox
                          className="chore-checkbox"
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
              </div>
            );
          } else {
            primaryElement = null;
          }

          return <div key={`list-c${value.id}`}>{primaryElement}</div>;
        })}
      </List>
    </div>
  );
}
