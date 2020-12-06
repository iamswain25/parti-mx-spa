import React from "react";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import PanToolIcon from "@material-ui/icons/PanTool";
import { Typography, Grid, Box } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import { Link } from "react-router-dom";
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
      whiteSpace: "pre-wrap",
      maxHeight: 60,
      lineClamp: 3,
      textOverflow: "ellipsis",
      display: "-webkit-box",
      boxOrient: "vertical",
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
  const { count_like = 0 } = p;
  return (
    <div className={classes.container}>
      <Box mb={1}>
        <Grid container direction="row">
          <Box mr={0.5} display="flex" alignItems="center">
            <PanToolIcon color="primary" className={classes.icon} />
          </Box>
          <Box color="primary.dark" fontWeight={500}>
            <Typography variant="h5">{count_like}명 동의</Typography>
          </Box>
        </Grid>
      </Box>
      <Link to={`/post/${p.id}`} className={classes.titleContainer}>
        <Typography variant="h3" color="textPrimary">
          {p.title}
        </Typography>
      </Link>
      <Box color="grey.600">
        <Typography variant="body1" className={classes.body}>
          {p.body}
        </Typography>
      </Box>
      <BoardPostSub2 post={p} />
    </div>
  );
}
