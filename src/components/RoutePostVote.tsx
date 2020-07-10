import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import useDesktop from "./useDesktop";
import { calculateDays } from "../helpers/datefns";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      borderBottom: `1px solid ${grey[200]}`,
      [theme.breakpoints.up("md")]: {
        height: 145,
      },
      padding: "12px 0",
    },
    title: {
      height: 24,
      [theme.breakpoints.down("sm")]: {
        letterSpacing: -0.35,
        fontWeight: 300,
      },
    },
    titleContainer: {
      display: "flex",
      overflow: "hidden",
      maxHeight: theme.spacing(6),
    },
    body: {
      maxHeight: theme.spacing(5),
      marginBottom: theme.spacing(1),
      overflow: "hidden",
    },
    icon: {
      width: 15,
      height: 17,
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: 12,
        height: 13,
      },
    },
  };
});

export default function RoutePostVote({ post: p }: { post: Post }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const navigatePost = useNavigateToPost();
  const daysLeft = calculateDays(p.created_at) ?? 30;
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <Grid container direction="row" alignItems="center">
        <HowToVoteIcon color="primary" className={classes.icon} />
        <Box color="primary.dark">
          <Typography variant="body2">{daysLeft}일 남음</Typography>
        </Box>
      </Grid>
      <Box className={classes.titleContainer} mt={1}>
        <Typography
          variant={isDesktop ? "h3" : "h4"}
          color="textPrimary"
          className={classes.title}
        >
          {p.title}
        </Typography>
      </Box>
      <Box mt={1}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Box color="grey.600">
            <Typography variant="body2">
              참여자 {p.users_aggregate.aggregate.sum.like_count}명
            </Typography>
          </Box>
        </Grid>
      </Box>
      {isDesktop && (
        <Box mt={1} color="grey.600">
          <Typography variant="body1" className={classes.body}>
            {p.body}
          </Typography>
        </Box>
      )}
      <BoardPostSub2 post={p} />
    </div>
  );
}
