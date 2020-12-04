import React from "react";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Box, Hidden } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      borderBottom: `1px solid ${grey[200]}`,
      [theme.breakpoints.up("md")]: {
        height: 145,
      },
      padding: "12px 0",
      display: "flex",
    },
    titleContainer: {
      overflow: "hidden",
      maxHeight: theme.spacing(6),
      cursor: "pointer",
    },
    body: {
      whiteSpace: "pre-wrap",
      maxHeight: theme.spacing(5),
      marginBottom: theme.spacing(1),
      overflow: "hidden",
    },
    img: {
      width: 176,
      height: 120,
      objectFit: "cover",
      backgroundColor: grey[200],
      marginRight: 18,
      cursor: "pointer",
    },
  };
});

export default function BoardPostNotice({ post: p }: { post: Post }) {
  const classes = useStyles();
  const firstImage = p.images?.[0]?.uri;
  return (
    <div className={classes.container}>
      {firstImage && (
        <Link to={`/post/${p.id}`}>
          <img src={firstImage} alt="post" className={classes.img} />
        </Link>
      )}
      <div>
        <Link to={`/post/${p.id}`}>
          <Box className={classes.titleContainer} mb={1} display="flex">
            <Typography variant="h3" color="textPrimary">
              {p.title}
            </Typography>
          </Box>
        </Link>
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
