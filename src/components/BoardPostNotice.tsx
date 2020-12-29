import React from "react";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Box, Hidden } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import { Link } from "react-router-dom";
import useStoragePath from "../store/useStoragePath";
import useDesktop from "./useDesktop";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      borderBottom: `1px solid ${grey[200]}`,
      [theme.breakpoints.up("md")]: {
        height: 145,
      },
      padding: "12px 0",
      display: "block",
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
      display: "block",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      [theme.breakpoints.up("md")]: {
        float: "left",
        marginRight: 18,
        "&>img": {
          width: 176,
          height: 120,
          objectFit: "cover",
          backgroundColor: grey[200],
        },
      },
    },
  };
});

export default function BoardPostNotice({ post: p }: { post: Post }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const firstImage = useStoragePath(p.images?.[0]?.path);
  return (
    <div className={classes.container}>
      {firstImage && (
        <Link to={`/post/${p.id}`} className={classes.img}>
          <img src={firstImage} alt="post" />
        </Link>
      )}
      <Box p={isDesktop ? 0 : 1}>
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
      </Box>
    </div>
  );
}
