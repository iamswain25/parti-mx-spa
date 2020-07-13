import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Grid, IconButton, Typography, Box, CssBaseline } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      overflow: "hidden",
    },
  };
});

export default function HeaderPost({ title = "로딩 중" }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid
      container
      className={classes.top}
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="back"
        edge="start"
        onClick={() => history.goBack()}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Box flexShrink={1}>
        <Typography variant="h3" color="textPrimary">
          {title}
        </Typography>
      </Box>
      <IconButton
        color="inherit"
        aria-label="back"
        edge="start"
        // onClick={}
      >
        <MoreVertIcon />
      </IconButton>
    </Grid>
  );
}
