import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import DrawerGroup from "./DrawerGroup";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  };
});

export default function HeaderBoard({ title = "로딩 중" }) {
  const classes = useStyles();
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
      <IconButton
        color="inherit"
        aria-label="back"
        edge="start"
        // onClick={}
      >
        <SearchIcon />
      </IconButton>
    </Grid>
  );
}
