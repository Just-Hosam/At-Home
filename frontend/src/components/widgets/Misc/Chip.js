import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import FaceIcon from '@material-ui/icons/Face';
// import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function SmallChip(props) {
  const classes = useStyles();
  const dashboardId = 1;

  const updateChip = (dashboardId, chip) => {
    axios
      .patch(`/dashboards/${dashboardId}/chores/${chip.id}`, chip)
      .then((res) => {
        // console.log('OFF TO MOONBASE DB:\n\t', res.data);
        props.clearChip(res.data);
      })
      .catch((err) => console.log("ERROR UPDATING CHIP", err));
  };

  const handleDelete = () => {
    // console.log('OG PROPS:\n\t', props.chipValue);
    const newChip = {...props.chipValue, name: 'none'};
    updateChip(dashboardId, newChip);
  };

  // const handleClick = () => {
  //   console.info('You clicked the Chip.');
  // };

  return (
    <div className={classes.root}>
      <Chip
        // size="small"
        avatar={<Avatar alt={props.name} src="PH" />}
        label={props.name}
        // onClick={handleClick}
        onDelete={handleDelete}
      />
    </div>
  );
}