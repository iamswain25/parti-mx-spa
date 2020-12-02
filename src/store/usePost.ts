import firebase from "firebase";
import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { PARAM_COLLECTION, COUNTER_VIEW_POST } from "../helpers/options";
import { Post } from "../types";
import { useCurrentUser } from "./useGlobalState";
export default function usePost(
  listen: Boolean = false
): [Post | null | undefined] {
  const { post_id: id } = useParams<{ post_id: string }>();
  const [item, setItem] = React.useState<Post | null | undefined>(undefined);
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser) {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .collection(PARAM_COLLECTION)
        .doc(COUNTER_VIEW_POST)
        .set(
          { [id]: firebase.firestore.FieldValue.increment(1) },
          { merge: true }
        );
    }
    if (listen) {
      return firestore
        .collection("posts")
        .doc(id)
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const item = { id: doc.id, ...doc.data() } as Post;
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
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const item = { id: doc.id, ...doc.data() } as Post;
            setItem(item);
          } else {
            setItem(null);
          }
        });
    }
  }, [id, listen, currentUser]);
  return [item];
}
