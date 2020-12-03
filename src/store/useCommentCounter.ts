import React from "react";
import { firestore } from "../config/firebase";
import { COUNTER_DOC, PARAM_COLLECTION } from "../helpers/options";
import { Counter } from "../types";

export default function useCommentCounter({
  post_id,
  comment_id,
  parent_id,
  listen = true,
}: {
  comment_id: string;
  post_id: string;
  parent_id?: string;
  listen?: Boolean;
}): [Counter | null | undefined] {
  const [item, setItem] = React.useState<Counter | null | undefined>(undefined);
  React.useEffect(() => {
    let docRef = firestore.collection("posts").doc(post_id);
    if (parent_id) {
      docRef = docRef.collection("comments").doc(parent_id);
    }
    if (listen) {
      return docRef
        .collection("comments")
        .doc(comment_id)
        .collection(PARAM_COLLECTION)
        .doc(COUNTER_DOC)
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const item = { ...doc.data() } as Counter;
              setItem(item);
            } else {
              setItem(null);
            }
          },
          (error) => {
            console.warn("usePost", error);
          }
        );
    } else {
      docRef
        .collection("comments")
        .doc(comment_id)
        .collection(PARAM_COLLECTION)
        .doc(COUNTER_DOC)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const item = { ...doc.data() } as Counter;
            setItem(item);
          } else {
            setItem(null);
          }
        });
    }
  }, [post_id, listen, parent_id, comment_id]);
  return [item];
}
