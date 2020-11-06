import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Box, Hidden } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import { LazyImage } from "react-lazy-images";
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
    imgContainer: {
      width: 176,
      height: 120,
      minWidth: 176,
      marginRight: 18,
      backgroundColor: grey[200],
      overflow: "hidden",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      cursor: "pointer",
    },
  };
});

export default function BoardPostNotice({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost(p.id);
  const firstImage = p.images?.[0]?.uri;
  return (
    <div className={classes.container}>
      {firstImage && (
        <LazyImage
          alt={p.title}
          placeholder={({ imageProps, ref }) => (
            <div ref={ref} className={classes.imgContainer} />
          )}
          src={firstImage}
          actual={({ imageProps }) => (
            <div className={classes.imgContainer}>
              <img
                {...imageProps}
                alt={imageProps.alt}
                className={classes.img}
              />
            </div>
          )}
        />
      )}
      <div>
        <Box
          className={classes.titleContainer}
          mb={1}
          display="flex"
          onClick={navigatePost}
        >
          <Typography variant="h3" color="textPrimary">
            {p.title}
          </Typography>
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
