import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function ListHeader(props) {
  return (
    <div>
      <Grid container>
        <Grid item xs>
          <Typography variant={props.size}>{props.title}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
