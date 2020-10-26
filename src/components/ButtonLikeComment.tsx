import React from "react";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import { useCurrentUser } from "../store/useGlobalState";
import { firestore } from "../config/firebase";
import { Comment } from "../types";
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
  },
}));
export default function ButtonLikeComment({
  comment: c,
}: {
  comment: Comment;
}) {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;
  async function pressHandler() {
    let postDoc = firestore.collection("posts").doc(c.post_id);
    if (c.parent_id) {
      postDoc = postDoc.collection("comments").doc(c.parent_id);
    }
    postDoc
      .collection("comments")
      .doc(c.id)
      .collection("likes")
      .doc(userId)
      .set(
        {
          created_at: new Date(),
          name: currentUser?.displayName,
          photo_url: currentUser?.photoURL,
        },
        { merge: true }
      );
  }

  return (
    <Box alignItems="center" display="flex">
      <Button className={classes.button} onClick={pressHandler}>
        공감
      </Button>
      <Box ml={0.5} alignItems="center" display="flex">
        {c.count_like}
      </Box>
    </Box>
  );
}
