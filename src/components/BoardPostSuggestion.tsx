import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import PanToolIcon from "@material-ui/icons/PanTool";
import { Typography, Grid } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      border: `1px solid ${grey[200]}`,
      padding: 16,
      // maxWidth: "calc(50% - 12px)",
    },
    title: {
      height: 24,
    },
    titleContainer: {
      display: "flex",
      overflow: "hidden",
      maxHeight: 48,
      marginBottom: 8,
    },
    body: {
      maxHeight: 60,
      marginBottom: 8,
      overflow: "hidden",
    },
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    margin: {
      marginRight: 8,
    },
    icon: {
      width: 16,
      height: 17,
      marginRight: 9,
      marginBottom: 8,
    },
  };
});

export default function BoardPostSuggestion({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost();
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <Grid container direction="row">
        <PanToolIcon color="primary" className={classes.icon} />
        <Typography variant="h5">
          {p.users_aggregate.aggregate.sum.like_count}명 동의
        </Typography>
      </Grid>
      <div className={classes.titleContainer}>
        <Typography variant="h3" className={classes.title}>
          {p.title}
        </Typography>
      </div>
      <Typography variant="body1" className={classes.body}>
        {p.body}
      </Typography>
      <BoardPostSub2 post={p} />
    </div>
  );
}
