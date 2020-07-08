import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import PanToolIcon from "@material-ui/icons/PanTool";
import { Typography, Grid } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import { calculateDays } from "../helpers/datefns";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      border: `1px solid ${grey[200]}`,
      margin: 48,
      marginBottom: 52,
      marginTop: 24,
      borderRadius: 4,
      backgroundColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.12)",
      boxShadow: theme.shadows[1],
    },
    title: {
      height: 24,
    },
    titleContainer: {
      display: "flex",
      overflow: "hidden",
      maxHeight: 48,
      // justifyContent: "space-between",
      marginBottom: 8,
      // borderBottom: `1px solid ${grey[400]}`,
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
    label: {
      height: 16,
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      alignItems: "center",
    },
    margin: {
      marginRight: 8,
    },
    icon: {
      width: 15,
      height: 17,
      marginRight: theme.spacing(1),
    },
  };
});

export default function BoardPostVote({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost();
  const daysLeft = calculateDays(p.created_at) ?? 30;
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <Grid container direction="row" justify="center">
        <HowToVoteIcon color="primary" className={classes.icon} />
        <Typography variant="h5">{daysLeft}일 남음</Typography>
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
