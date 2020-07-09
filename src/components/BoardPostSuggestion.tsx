import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import PanToolIcon from "@material-ui/icons/PanTool";
import { Typography, Grid, Box, useMediaQuery } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        border: `1px solid ${grey[200]}`,
      },
      [theme.breakpoints.down("sm")]: {
        borderBottom: `1px solid ${grey[200]}`,
      },
      padding: theme.spacing(2),
    },
    title: {
      height: theme.spacing(3),
    },
    titleContainer: {
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

export default function BoardPostSuggestion({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <Box mb={1}>
        <Grid container direction="row">
          <Box mr={1}>
            <PanToolIcon color="primary" className={classes.icon} />
          </Box>
          <Typography variant={isDesktop ? "h5" : "body2"} color="primary">
            {p.users_aggregate.aggregate.sum.like_count}명 동의
          </Typography>
        </Grid>
      </Box>
      <div className={classes.titleContainer}>
        <Typography variant={isDesktop ? "h3" : "h5"} className={classes.title}>
          {p.title}
        </Typography>
      </div>
      <Typography variant={isDesktop ? "body1" : "h6"} className={classes.body}>
        {p.body}
      </Typography>
      <BoardPostSub2 post={p} />
    </div>
  );
}
