import React from "react";
import { firestore } from "../config/firebase";
import { COUNTER_DOC, PARAM_COLLECTION } from "../helpers/options";
import { Counter } from "../types";

export default function useCounter(
  post_id?: string,
  listen: Boolean = false
): [Counter | null | undefined] {
  const [item, setItem] = React.useState<Counter | null | undefined>(undefined);
  React.useEffect(() => {
    if (listen) {
      return firestore
        .collection("posts")
        .doc(post_id)
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
      firestore
        .collection("posts")
        .doc(post_id)
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
  }, [post_id, listen]);
  return [item];
}
