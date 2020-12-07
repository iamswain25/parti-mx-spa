import React from "react";
import { Post } from "../types";
import { Box, IconButton, Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import { Img } from "react-image";
import BoardPostSub2 from "./BoardPostSub2";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    // height: 159,
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
    width: 112,
    height: 112,
    objectFit: "cover",
    cursor: "pointer",
  },
  icon: {
    width: 20,
    height: 20,
    color: "#a9aaad",
  },
}));

export default function RouteMapPostBottom({
  post: p,
  setSelectedPlace,
}: {
  post: Post;
  setSelectedPlace: any;
}) {
  const classes = useStyles();
  function unclickHandler() {
    setSelectedPlace(undefined);
  }
  return (
    <Box className={classes.container}>
      <Box pt={1}>
        <Grid container alignItems="center" justify="center">
          <IconButton className={classes.icon} onClick={unclickHandler}>
            <ExpandMoreIcon />
          </IconButton>
        </Grid>
      </Box>
      <Box p={2} pt={1} display="flex">
        <Link to={`/post/${p.id}`}>
          <Img
            src={[...(p?.images?.map((i) => i.uri) || []), "/favicon.ico"]}
            className={classes.img}
          />
        </Link>
        <Box ml={1}>
          <Link to={`/post/${p.id}`}>
            <Box className={classes.titleContainer}>{p.title}</Box>
          </Link>
          <BoardPostSub2 post={p} />
        </Box>
      </Box>
    </Box>
  );
}
