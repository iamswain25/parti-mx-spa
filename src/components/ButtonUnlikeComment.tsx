import React from "react";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import { firestore } from "../config/firebase";
import firebase from "firebase";
import { useCurrentUser } from "../store/useGlobalState";
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
  },
}));
export default function ButtonUnlikeComment(props: {
  id: string;
  count: number;
}) {
  const classes = useStyles();
  const { id, count } = props;
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;

  async function pressHandler() {
    const comment = (
      await firestore
        .collectionGroup("comments")
        .where(firebase.firestore.FieldPath.documentId(), "==", id)
        .get()
    ).docs?.[0];
    comment.ref.collection("likes").doc(userId).delete();
  }

  return (
    <Box alignItems="center" display="flex" color="primary.main">
      <Button className={classes.button} onClick={pressHandler}>
        공감취소
      </Button>
      <Box ml={0.5} alignItems="center" display="flex">
        {count}
      </Box>
    </Box>
  );
}
