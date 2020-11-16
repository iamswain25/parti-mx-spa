import React from "react";
import { makeStyles } from "@material-ui/core";
import BoardTabNavigator from "./BoardTabNavigator";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(3),
      paddingLeft: 30,
      paddingRight: 30,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 1200,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));
export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {children}
      <BoardTabNavigator />
    </div>
  );
}
