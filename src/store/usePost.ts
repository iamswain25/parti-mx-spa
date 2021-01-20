import firebase from "firebase";
import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Post } from "../types";
import { useCurrentUser } from "./useGlobalState";
export default function usePost(
  listen: Boolean = true,
): [Post | null | undefined] {
  const { post_id: id } = useParams<{ post_id: string }>();
  const [item, setItem] = React.useState<Post | null | undefined>(undefined);
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser) {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .collection("posts")
        .doc(id)
        .set(
          {
            count_view: firebase.firestore.FieldValue.increment(1),
            updated_at: new Date(),
          },
          { merge: true },
        )
        .catch(error => {
          console.warn("view count", error);
        });
      if (listen) {
        return firestore
          .collection("posts")
          .doc(id)
          .onSnapshot(
            doc => {
              if (doc.exists) {
                const item = { id: doc.id, ...doc.data() } as Post;
                setItem(item);
              } else {
                setItem(null);
              }
            },
            error => {
              console.warn("listen Post", error);
              setItem(null);
            },
          );
      } else {
        firestore
          .collection("posts")
          .doc(id)
          .get()
          .then(doc => {
            if (doc.exists) {
              const item = { id: doc.id, ...doc.data() } as Post;
              setItem(item);
            } else {
              setItem(null);
            }
          })
          .catch(error => {
            console.warn("get Post", error);
            setItem(null);
          });
        return () => setItem(undefined);
      }
    }
  }, [id, listen, currentUser]);
  return [item];
}
