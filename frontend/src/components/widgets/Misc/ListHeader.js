import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  listHeader: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    textAlign: "center",
    minWidth: 120,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListHeader(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.listHeader}>
        <Grid item xs>
          <Typography variant={props.size}>{props.title}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
