import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Post } from "../types";
export default function usePost(
  listen: Boolean = false
): [Post | null | undefined] {
  const { post_id: id } = useParams<{ post_id: string }>();
  const [item, setItem] = React.useState<Post | null | undefined>(undefined);
  React.useEffect(() => {
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
  }, [id, listen]);
  return [item];
}
