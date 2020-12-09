import React from "react";
import { firestore } from "../config/firebase";
import { Comment } from "../types";
export default function useComments2(c: Comment, listen = false) {
  const [items, setItems] = React.useState<Comment[]>([] as Comment[]);
  React.useEffect(() => {
    if (c.post_id && c.id)
      if (listen) {
        return firestore
          .collection("posts")
          .doc(c.post_id)
          .collection("comments")
          .doc(c.id)
          .collection("comments")
          .orderBy("created_at", "asc")
          .onSnapshot((snapshot) =>
            setItems(
              snapshot.docs.map(
                (doc) =>
                  ({ id: doc.id, parent_id: c.id, ...doc.data() } as Comment)
              )
            )
          );
      } else {
        firestore
          .collection("posts")
          .doc(c.post_id)
          .collection("comments")
          .doc(c.id)
          .collection("comments")
          .orderBy("created_at", "asc")
          .get()
          .then((snapshot) =>
            setItems(
              snapshot.docs.map(
                (doc) =>
                  ({ id: doc.id, parent_id: c.id, ...doc.data() } as Comment)
              )
            )
          );
      }
  }, [c, setItems, listen]);
  return [items];
}
