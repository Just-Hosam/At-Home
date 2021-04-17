import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ProgressBar(props) {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  const total = props.choresList.length;
  const complete = props.doneList.length;

  useEffect(() => {
    setProgress((complete / total) * 100);
  }, [total, complete]);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}
