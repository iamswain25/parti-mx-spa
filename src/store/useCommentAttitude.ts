import React from "react";
import { firestore } from "../config/firebase";
import { Comment } from "../types";

export default function useCommentAttitude(c: Comment) {
  const [liked, setLiked] = React.useState<boolean | undefined>(undefined);
  React.useEffect(() => {
    if (c.post_id && c.id) {
      firestore
        .collection("posts")
        .doc(c.post_id)
        .collection("likes")
        .doc(c.created_by)
        .get()
        .then((doc) => setLiked(doc.exists));
      // return firestore
      //   .collection("posts")
      //   .doc(c.post_id)
      //   .collection("likes")
      //   .doc(c.created_by)
      //   .onSnapshot((doc) => setLiked(doc.exists));
    }
  }, [setLiked, c]);
  return [liked];
}
