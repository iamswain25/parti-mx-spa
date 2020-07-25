import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography, Box, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useGoBack from "./useGoBack";
const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
      paddingLeft: theme.spacing(2),
      overflow: "hidden",
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
    },
  };
});

export default function HeaderNew({ title = "로딩 중" }: { title: string }) {
  const classes = useStyles();
  const back = useGoBack();
  return (
    <Grid
      container
      className={classes.top}
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <IconButton color="inherit" aria-label="back" edge="start" onClick={back}>
        <CloseIcon />
      </IconButton>
      <Box flexShrink={1}>
        <Typography variant="h3" color="textPrimary">
          {title}
        </Typography>
      </Box>
      <Button aria-label="back" type="submit">
        <Box color="primary.dark">등록</Box>
      </Button>
    </Grid>
  );
}
