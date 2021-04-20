import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" id="chores-progress-bar">
      <Box width="100%" mr={1} ml={6}>
        <LinearProgress
          variant="determinate"
          {...props}
          style={{ height: '8px', borderRadius: '5px' }}
        />
      </Box>
      <Box minWidth={37}>
        <Typography variant="body2" color="#373a40">{`${Math.round(
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
  const parentProgress = { ...props.choreState.progress };
  const setParentProgress = props.choreState.setProgress;
  const total = props.choresList.length;
  const complete = props.doneList.length;

  useEffect(() => {
    setParentProgress({
      ...parentProgress,
      progress: (complete / total) * 100,
    });
  }, [total, complete]);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={parentProgress.progress} />
    </div>
  );
}
