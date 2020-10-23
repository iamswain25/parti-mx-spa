import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import DrawerGroup from "./DrawerGroup";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../store/useGlobalState";
const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        maxWidth: 1200,
        paddingLeft: 30,
        paddingRight: 30,
        margin: "0 auto",
      },
    },
  };
});

export default function HeaderBoard({ title = "로딩 중" }) {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  return (
    <Grid
      container
      className={classes.top}
      justify="space-between"
      alignItems="center"
    >
      <DrawerGroup />
      <Typography variant="h3" color="textPrimary">
        {title}
      </Typography>
      {currentUser ? (
        <Link to="/search">
          <SearchIcon />
        </Link>
      ) : (
        <div />
      )}
    </Grid>
  );
}
