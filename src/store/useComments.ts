import React from "react";
import { firestore } from "../config/firebase";
import { COMMENT_LIMIT } from "../helpers/options";
import { Comment } from "../types";
import firebase from "firebase";
let lastSnapshot: null | firebase.firestore.DocumentSnapshot = null;
export default function useComments({
  post_id,
}: {
  post_id: string;
}): [Comment[], () => void, boolean, boolean] {
  const [items, setItems] = React.useState<Comment[]>([] as Comment[]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [startAfter, setStartAfter] = React.useState<
    null | firebase.firestore.DocumentSnapshot | undefined
  >(undefined);
  React.useEffect(() => {
    if (startAfter === undefined) {
      return;
    }
    /**
     * startAfter 이후 댓글 (자신이 다는 댓글 등) subscription 해서 보기
     * startAfter 없을 시 모든 댓글 subscription
     */
    let query = firestore
      .collection("posts")
      .doc(post_id)
      .collection("comments")
      .orderBy("created_at", "asc");
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
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
  }, [post_id, startAfter]);
  React.useEffect(() => {
    firestore
      .collection("posts")
      .doc(post_id)
      .collection("comments")
      .orderBy("created_at", "asc")
      .limitToLast(COMMENT_LIMIT)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setStartAfter(null);
          setHasMore(false);
        } else {
          lastSnapshot = snapshot.docs[0];
          const getLast = snapshot.docs[snapshot.docs.length - 1];
          setStartAfter(getLast);
          const items = snapshot.docs.map(
            doc => ({ id: doc.id, ...doc.data() } as Comment),
          );
          setItems(items);
          if (items.length < COMMENT_LIMIT) {
            setHasMore(false);
          }
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
        .collection("comments")
        .orderBy("created_at", "asc")
        .endBefore(lastSnapshot)
        .limitToLast(COMMENT_LIMIT)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            setHasMore(false);
          } else {
            lastSnapshot = snapshot.docs[0];
            const newItems = snapshot.docs.map(
              doc => ({ id: doc.id, ...doc.data() } as Comment),
            );
            setItems(items => [...newItems, ...items]);
          }
          setLoading(false);
        });
    },
    [setLoading, setItems, setHasMore, post_id],
  );
  return [items, loadmore, loading, hasMore];
}
