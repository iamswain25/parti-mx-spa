import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: theme.spacing(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function Forbidden() {
  const classes = useStyles();
  return (
    <Typography variant="h1">
      <div className={classes.div}>Forbidden</div>
    </Typography>
  );
}
