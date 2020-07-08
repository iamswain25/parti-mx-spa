import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { semanticDate } from "../helpers/datefns";
import PanToolIcon from "@material-ui/icons/PanTool";
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
      fontFamily: "NotoSansCJKkr",
      fontSize: 18,
      letterSpacing: -0.5,
      color: "rgba(0, 0, 0, 0.87)",
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
      fontFamily: "NotoSansCJKkr",
      fontSize: 14,
      letterSpacing: -0.3,
      marginBottom: 8,
      color: grey[600],
      overflow: "hidden",
    },
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      height: 16,
      fontFamily: "NotoSansCJKkr",
      fontSize: 11,
      color: grey[600],
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

export default function BoardSuggestionPost({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost();
  const firstImage = p.images?.[0].uri;
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <div>
        <PanToolIcon color="primary" />
        <div className={classes.titleContainer}>
          <h4 className={classes.title}>{p.title}</h4>
        </div>
        <h5 className={classes.body}>{p.body}</h5>
        <div className={classes.label}>
          <div className={classes.margin}>{p.createdBy.name}</div>
          <div className={classes.margin}>{semanticDate(p.created_at)}</div>
          <div className={classes.margin}>
            댓글 {p.comments_aggregate.aggregate.count}
          </div>
          <div className={classes.margin}>
            공감 {p.users_aggregate.aggregate.sum.like_count}
          </div>
        </div>
      </div>
    </div>
  );
}
