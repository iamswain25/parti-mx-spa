import React from "react";
import { Post } from "../types";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import { Img } from "react-image";
import BoardPostSub2 from "./BoardPostSub2";
import useNavigateToPost from "./useNavigateToPost";
export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: theme.spacing(1),
  },
  titleContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: 14,
    letterSpacing: -0.39,
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "pointer",
  },
  img: {
    width: 251,
    height: 112,
    objectFit: "cover",
  },
}));

export default function RouteMapPost({ post: p }: { post: Post }) {
  const navigatePost = useNavigateToPost(p.id);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Img
        src={[...(p.images?.map((i) => i.uri) || []), "/favicon.ico"]}
        className={classes.img}
      />
      <Box className={classes.titleContainer} onClick={navigatePost}>
        {p.title}
      </Box>
      <BoardPostSub2 post={p} />
    </div>
  );
}
