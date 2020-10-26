import React from "react";
import { firestore } from "../config/firebase";
import { Comment } from "../types";
export default function useComments2(c: Comment) {
  const [items, setItems] = React.useState<Comment[]>([] as Comment[]);
  React.useEffect(() => {
    if (c.post_id && c.id)
      return firestore
        .collection("posts")
        .doc(c.post_id)
        .collection("comments")
        .doc(c.id)
        .collection("comments")
        .onSnapshot((snapshot) =>
          setItems(
            snapshot.docs.map(
              (doc) =>
                ({ id: doc.id, parent_id: c.id, ...doc.data() } as Comment)
            )
          )
        );
  }, [c, setItems]);
  return [items];
}
