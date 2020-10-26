import React from "react";
import { firestore } from "../config/firebase";
import { Comment } from "../types";
import { useCurrentUser } from "./useGlobalState";

export default function useCommentLiked(c: Comment) {
  const [liked, setLiked] = React.useState(false);
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser) {
      if (c.parent_id && c.post_id && c.id) {
        return firestore
          .collection("posts")
          .doc(c.post_id)
          .collection("comments")
          .doc(c.parent_id)
          .collection("comments")
          .doc(c.id)
          .collection("likes")
          .doc(currentUser.uid)
          .onSnapshot((doc) => setLiked(doc.exists));
      } else if (c.post_id && c.id) {
        console.log(c);
        return firestore
          .collection("posts")
          .doc(c.post_id)
          .collection("comments")
          .doc(c.id)
          .collection("likes")
          .doc(currentUser.uid)
          .onSnapshot((doc) => setLiked(doc.exists));
      }
    }
  }, [currentUser, setLiked, c]);
  return [liked];
}
