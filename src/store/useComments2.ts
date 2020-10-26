import React from "react";
import { firestore } from "../config/firebase";
import { Comment } from "../types";
export default function useComments2({
  comment_id,
  post_id,
}: {
  comment_id: string;
  post_id: string;
}) {
  const [items, setItems] = React.useState<Comment[]>([] as Comment[]);
  React.useEffect(() => {
    return firestore
      .collection("posts")
      .doc(post_id)
      .collection("comments")
      .doc(comment_id)
      .collection("comments")
      .onSnapshot((snapshot) =>
        setItems(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment))
        )
      );
  }, [comment_id, post_id, setItems]);
  return [items];
}
