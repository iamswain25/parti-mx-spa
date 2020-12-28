import React from "react";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Box, Hidden } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import { Link } from "react-router-dom";
import useStoragePath from "../store/useStoragePath";
const useStyles = makeStyles(theme => {
  return {
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    titleContainer: {
      overflow: "hidden",
      cursor: "pointer",
    },
    body: {
      whiteSpace: "pre-wrap",
      marginBottom: theme.spacing(1),
      overflow: "hidden",
      maxHeight: theme.spacing(5),
    },
    img: {
      width: "100%",
      objectFit: "cover",
      backgroundColor: grey[200],
      marginRight: 18,
      cursor: "pointer",
    },
  };
});

export default function RouteBoardAnnounce({ post: p }: { post: Post }) {
  const classes = useStyles();
  const firstImage = useStoragePath(p.images?.[0]?.path);
  return (
    <div className={classes.container}>
      {firstImage && (
        <Link to={`/post/${p.id}`}>
          <img src={firstImage} alt="post" className={classes.img} />
        </Link>
      )}
      <div>
        <Box className={classes.titleContainer} mb={1} display="flex">
          <Link to={`/post/${p.id}`}>
            <Typography variant="h3" color="textPrimary">
              {p.title}
            </Typography>
          </Link>
        </Box>
        <Hidden implementation="css" smDown>
          <Box color="grey.600">
            <Typography variant="body1" className={classes.body}>
              {p.body}
            </Typography>
          </Box>
        </Hidden>
        <BoardPostSub2 post={p} />
      </div>
    </div>
  );
}
