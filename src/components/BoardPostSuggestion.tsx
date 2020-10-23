import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import PanToolIcon from "@material-ui/icons/PanTool";
import { Typography, Grid, Box } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        border: `1px solid ${grey[200]}`,
      },
      [theme.breakpoints.down("sm")]: {
        borderBottom: `1px solid ${grey[200]}`,
        paddingLeft: 0,
      },
      padding: theme.spacing(2),
    },
    title: {
      height: theme.spacing(3),
    },
    titleContainer: {
      cursor: "pointer",
      display: "flex",
      overflow: "hidden",
      maxHeight: theme.spacing(6),
      marginBottom: theme.spacing(1),
    },
    body: {
      whiteSpace: "pre-wrap",
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
  const navigatePost = useNavigateToPost(p.id);
  const count = 0;
  return (
    <div className={classes.container}>
      <Box mb={1}>
        <Grid container direction="row">
          <Box mr={1}>
            <PanToolIcon color="primary" className={classes.icon} />
          </Box>
          <Box color="primary.dark" fontWeight={500}>
            <Typography variant="h5">{count}명 동의</Typography>
          </Box>
        </Grid>
      </Box>
      <div className={classes.titleContainer} onClick={navigatePost}>
        <Typography variant="h3" className={classes.title} color="textPrimary">
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
