import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Button, Box } from "@material-ui/core";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import { calculateDays } from "../helpers/datefns";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: `1px solid ${grey[200]}`,
      [theme.breakpoints.up("md")]: {
        margin: 48,
        marginBottom: 52,
        marginTop: 24,
        padding: 20,
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        marginRight: theme.spacing(2),
        height: `calc(100% - ${theme.spacing(2)}px)`,
        maxWidth: 232,
      },
      borderRadius: 4,
      backgroundColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.12)",
      boxShadow: theme.shadows[1],
    },

    titleContainer: {
      flex: 1,
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
        <Box color="primary.dark" fontWeight={500}>
          <Typography variant="h5">{daysLeft}일 남음</Typography>
        </Box>
      </Grid>
      <Box className={classes.titleContainer} fontWeight={500}>
        <Typography variant="h2" color="textPrimary">
          {p.title}
        </Typography>
      </Box>
      <Box color="grey.600">
        <Typography variant="subtitle1" className={classes.body}>
          참여자 {p.users_aggregate.aggregate.sum.like_count}명
        </Typography>
      </Box>
      <Button variant="contained" color="primary">
        <Box fontWeight={500}>투표하러 가기</Box>
      </Button>
    </div>
  );
}
