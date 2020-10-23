import React from "react";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import { useGlobalState, keys, useCurrentUser } from "../store/useGlobalState";
import { firestore } from "../config/firebase";
import firebase from "firebase";
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
  },
}));
export default function ButtonLikeComment(props: {
  id?: string;
  count?: number;
}) {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;
  const [, showLogin] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const { id, count } = props;
  async function pressHandler() {
    const comment = (
      await firestore
        .collectionGroup("comments")
        .where(firebase.firestore.FieldPath.documentId(), "==", id)
        .get()
    ).docs?.[0];
    comment.ref
      .collection("likes")
      .doc(userId)
      .set({ created_at: new Date() }, { merge: true });
  }

  return (
    <Box alignItems="center" display="flex">
      <Button className={classes.button} onClick={pressHandler}>
        공감
      </Button>
      <Box ml={0.5} alignItems="center" display="flex">
        {count}
      </Box>
    </Box>
  );
}
