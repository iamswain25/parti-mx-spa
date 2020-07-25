import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid, IconButton, Typography, Box } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PostMenu from "./PostMenu";
import { Post } from "../types";
import useGoBack from "./useGoBack";

const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      overflow: "hidden",
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
    },
  };
});

export default function HeaderPost({ post: p }: { post: Post }) {
  const title = p.board?.group?.title || "로딩 중";
  const groupId = p.board?.group?.id;
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
        <ChevronLeftIcon />
      </IconButton>
      <Box flexShrink={1}>
        <Link to={`/home?group_id=${groupId}`}>
          <Typography variant="h3" color="textPrimary">
            {title}
          </Typography>
        </Link>
      </Box>
      <PostMenu post={p} />
    </Grid>
  );
}
