import React from "react";
import { firestore } from "../config/firebase";
import { Comment } from "../types";
export default function useComments(id: string): [Comment[]] {
  const [items, setItems] = React.useState<Comment[]>([] as Comment[]);
  React.useEffect(() => {
    return firestore
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("created_at", "asc")
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Comment)
        );
        setItems(items);
      });
  }, [id]);
  return [items];
}
