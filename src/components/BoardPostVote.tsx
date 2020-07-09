import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Button } from "@material-ui/core";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import { calculateDays } from "../helpers/datefns";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: `1px solid ${grey[200]}`,
      margin: 48,
      marginBottom: 52,
      marginTop: 24,
      padding: 20,
      borderRadius: 4,
      backgroundColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.12)",
      boxShadow: theme.shadows[1],
    },

    titleContainer: {
      display: "flex",
      overflow: "hidden",
      maxHeight: 84,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      justifyContent: "center",
    },
    body: {
      marginBottom: theme.spacing(1),
      overflow: "hidden",
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
        <Typography variant="h2">{p.title}</Typography>
      </div>
      <Typography variant="subtitle1" className={classes.body}>
        참여자 {p.users_aggregate.aggregate.sum.like_count}명
      </Typography>
      <Button variant="contained" color="primary">
        투표하러 가기
      </Button>
    </div>
  );
}