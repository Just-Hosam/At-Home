import React from 'react';
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

export default function SmallChips(props) {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    /* axios
      .delete(`/dashboards/${dashboardId}/photos/${staging.id}`)
      .then(() => {
        axios
          .get(`/dashboards/${dashboardId}/photos/`)
          .then((res) => {
            props.handleState(res.data);
            setPhotos(res.data);
          })
          .then(() => {
            setStaging({});
          });
      })
      .catch((err) => console.log("DELETE CHIP ERROR", err)); */
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