import React from "react";
import { firestore } from "../config/firebase";
import { PostLike } from "../types";
let lastSnapshot: null | firebase.firestore.DocumentSnapshot = null;
export default function usePostLikedUsers(
  post_id: string
): [PostLike[], () => void, boolean, boolean] {
  const [items, setItems] = React.useState<PostLike[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [startAfter, setStartAfter] = React.useState<
    null | firebase.firestore.DocumentSnapshot | undefined
  >(undefined);
  React.useEffect(() => {
    if (startAfter === undefined) {
      return;
    }
    let query = firestore
      .collection("posts")
      .doc(post_id)
      .collection("likes")
      .orderBy("created_at", "asc");
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    return query.onSnapshot((snapshot) => {
      const newItems = snapshot
        .docChanges()
        .filter((change) => change.type === "added")
        .map((change) => {
          const doc = change.doc;
          return { id: doc.id, ...doc.data() } as PostLike;
        });
      setItems((items) => [...items, ...newItems]);
      const deletedIds = snapshot
        .docChanges()
        .filter((change) => change.type === "removed")
        .map((change) => change.doc.id);
      setItems((items) => [
        ...items.filter((item) => !deletedIds.includes(item.id)),
      ]);
    });
  }, [post_id, startAfter]);
  React.useEffect(() => {
    firestore
      .collection("posts")
      .doc(post_id)
      .collection("likes")
      .orderBy("created_at", "asc")
      .limitToLast(12)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setStartAfter(null);
        } else {
          lastSnapshot = snapshot.docs[0];
          const getLast = snapshot.docs[snapshot.docs.length - 1];
          setStartAfter(getLast);
          const items = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as PostLike)
          );
          setItems(items);
        }
        setLoading(false);
      });
  }, [post_id, setStartAfter]);
  const loadmore = React.useCallback(
    function loadmore() {
      setLoading(true);
      firestore
        .collection("posts")
        .doc(post_id)
        .collection("likes")
        .orderBy("created_at", "asc")
        .endBefore(lastSnapshot)
        .limitToLast(12)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            setHasMore(false);
          } else {
            lastSnapshot = snapshot.docs[0];
            const newItems = snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as PostLike)
            );
            setItems((items) => [...newItems, ...items]);
          }
          setLoading(false);
        });
    },
    [setLoading, setItems, setHasMore, post_id]
  );
  return [items, loadmore, loading, hasMore];
}
