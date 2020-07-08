import React from "react";
// import { useStore } from "../store/store";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      borderBottom: `1px solid ${grey[200]}`,
      height: 145,
      padding: "12px 0",
      display: "flex",
    },
    title: {
      height: 24,
    },
    titleContainer: {
      display: "flex",
      overflow: "hidden",
      maxHeight: 48,
      // justifyContent: "space-between",
      marginBottom: 8,
      // borderBottom: `1px solid ${grey[400]}`,
    },
    body: {
      maxHeight: 40,
      marginBottom: 8,
      overflow: "hidden",
    },
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      height: 16,
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      alignItems: "center",
    },
    margin: {
      marginRight: 8,
    },
    img: {
      width: 176,
      height: 120,
      backgroundColor: "#eeeeee",
      marginRight: 18,
    },
  };
});

export default function BoardPostNotice({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost();
  const firstImage = p.images?.[0].uri;
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      {firstImage && (
        <img src={firstImage} alt="post" className={classes.img} />
      )}
      <div>
        <div className={classes.titleContainer}>
          <Typography variant="h3" className={classes.title}>
            {p.title}
          </Typography>
        </div>
        <Typography variant="body1" className={classes.body}>
          {p.body}
        </Typography>
        <BoardPostSub2 post={p} />
      </div>
    </div>
  );
}
