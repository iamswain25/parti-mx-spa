import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import PanToolIcon from "@material-ui/icons/PanTool";
import { Typography, Grid, Box } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import { calculateDays } from "../helpers/datefns";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      borderBottom: `1px solid ${grey[200]}`,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
    titleContainer: {
      cursor: "pointer",
      display: "flex",
      overflow: "hidden",
      maxHeight: theme.spacing(6),
      marginBottom: theme.spacing(1),
    },
    body: {
      maxHeight: 60,
      marginBottom: theme.spacing(1),
      overflow: "hidden",
    },
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    margin: {
      marginRight: theme.spacing(1),
    },
    icon: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        width: 13,
        height: 14,
      },
    },
  };
});

export default function RoutePostSuggestion({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost(p.id);
  const daysLeft = calculateDays(p.created_at) ?? 30;
  return (
    <div className={classes.container}>
      <Box mb={1}>
        <Grid container direction="row">
          <Box mr={0.5} display="flex" alignItems="center">
            <PanToolIcon color="primary" className={classes.icon} />
          </Box>
          <Box color="primary.dark" fontWeight={500}>
            <Typography variant="h5">
              {p.users_aggregate.aggregate.sum.like_count}명 동의 / D{daysLeft}
            </Typography>
          </Box>
        </Grid>
      </Box>
      <div className={classes.titleContainer} onClick={navigatePost}>
        <Typography variant="h3" color="textPrimary">
          {p.title}
        </Typography>
      </div>
      <Box color="grey.600">
        <Typography variant="body1" className={classes.body}>
          {p.body}
        </Typography>
      </Box>
      <BoardPostSub2 post={p} />
    </div>
  );
}
