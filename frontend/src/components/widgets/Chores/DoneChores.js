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
import ClearIcon from '@material-ui/icons/Clear';

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

export default function DoneChores(props) {
  const dashboardId = 1;
  const classes = useStyles();
  const parentChores = [...props.choreState.choresList];
  const setParentChores = props.choreState.setChoresList;
  const parentDone = [...props.choreState.doneList];
  const setParentDone = props.choreState.setDoneList;
  const parentProgress = [...props.choreState.progress];
  const setParentProgress = props.choreState.setProgress;
  const [dashboardUsers, setDashboardUsers] = useState([]);
  const [progress, setProgress] = useState({
    total: 0,
    current: 0,
  });
  
  // console.log(`choresList`, choresList)
  // console.log(`parentChores`, parentChores)
  console.log(`props`, props.choreState)

  useEffect(() => {
    axios
      .get(`/dashboards/${dashboardId}/chores/`)
      .then((res) => {
        setParentChores(res.data);
        setProgress({ ...progress, total: res.data.length });
        setParentDone(res.data.filter((elem) => elem.done));
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


  return (
    <div className={classes.root}>
      <ListHeader key="TODO-done" size="h6" title="DONE!" />
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
              <IconButton edge="end" aria-label="done">
                <DoneIcon />
              </IconButton>
            );

            primaryElement = (
              <>
                <ListItem
                  key={value.id}
                  role={undefined}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon>
                      <ClearIcon
                        // edge="start"
                        checked={value.done}
                        // inputProps={{ 'aria-labelledby': labelId }}
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
