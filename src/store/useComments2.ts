import React from "react";
import { firestore } from "../config/firebase";
import { Comment } from "../types";
export default function useComments2(
  c: Comment,
  listen = false,
): [Comment[], () => void] {
  const [items, setItems] = React.useState<Comment[]>([] as Comment[]);
  const [startAfter, setStartAfter] = React.useState<
    null | firebase.firestore.DocumentSnapshot | undefined
  >(undefined);
  const getMore = React.useCallback(() => {
    let query = firestore
      .collection("posts")
      .doc(c.post_id)
      .collection("comments")
      .doc(c.id)
      .collection("comments")
      .orderBy("created_at", "asc");
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    query.get().then(snapshot => {
      if (snapshot.empty) {
        setStartAfter(null);
      } else {
        const getLast = snapshot.docs[snapshot.docs.length - 1];
        setStartAfter(getLast);
        setItems(items => [
          ...items,
          ...snapshot.docs.map(
            doc => ({ id: doc.id, parent_id: c.id, ...doc.data() } as Comment),
          ),
        ]);
      }
    });
  }, [c, startAfter]);
  React.useEffect(() => {
    if (c.post_id && c.id)
      if (listen) {
        let query = firestore
          .collection("posts")
          .doc(c.post_id)
          .collection("comments")
          .doc(c.id)
          .collection("comments")
          .orderBy("created_at", "asc");
        return query.onSnapshot(snapshot => {
          const newItems = snapshot
            .docChanges()
            .filter(change => change.type === "added")
            .map(change => {
              const doc = change.doc;
              return { id: doc.id, ...doc.data() } as Comment;
            });
          setItems(items => [...items, ...newItems]);
          const deletedIds = snapshot
            .docChanges()
            .filter(change => change.type === "removed")
            .map(change => change.doc.id);
          setItems(items => [
            ...items.filter(item => !deletedIds.includes(item.id)),
          ]);
        });
      } else {
        getMore();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c, setItems, listen]);

  return [items, getMore];
}
