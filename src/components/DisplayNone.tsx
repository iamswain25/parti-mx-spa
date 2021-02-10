import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(3, 0),
  },
}));
export default function DisplayNone({ text = "" }) {
  const classes = useStyles();
  return <section className={classes.root}>{text}</section>;
}
