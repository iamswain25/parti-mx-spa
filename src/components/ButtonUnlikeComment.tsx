import React from "react";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import { firestore } from "../config/firebase";
import { useCurrentUser } from "../store/useGlobalState";
import { Comment } from "../types";
import usePermission from "../store/usePermission";
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
  },
}));
export default function ButtonUnlikeComment({
  comment: c,
}: {
  comment: Comment;
}) {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const [hasPermission, showAlert] = usePermission("like");
  const { count_like = 0 } = c;
  const userId = currentUser?.uid;

  async function pressHandler() {
    if (!hasPermission) {
      return showAlert();
    }
    if (c.parent_id) {
      await firestore
        .collection("posts")
        .doc(c.post_id)
        .collection("comments")
        .doc(c.parent_id)
        .collection("comments")
        .doc(c.id)
        .collection("likes")
        .doc(userId)
        .delete();
    } else {
      await firestore
        .collection("posts")
        .doc(c.post_id)
        .collection("comments")
        .doc(c.id)
        .collection("likes")
        .doc(userId)
        .delete();
    }
  }

  return (
    <Box alignItems="center" display="flex" color="primary.main">
      <Button className={classes.button} onClick={pressHandler}>
        공감취소
      </Button>
      <Box ml={0.5} alignItems="center" display="flex">
        {count_like}
      </Box>
    </Box>
  );
}
