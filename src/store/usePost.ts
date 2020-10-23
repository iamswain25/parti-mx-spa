import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Post } from "../types";
export default function usePost(listen: Boolean = false): [Post] {
  const { post_id: id } = useParams<{ post_id: string }>();
  const [item, setItem] = React.useState<Post>({} as Post);
  React.useEffect(() => {
    if (listen) {
      return firestore
        .collection("posts")
        .doc(id)
        .onSnapshot((doc) => {
          const item = { id: doc.id, ...doc.data() } as Post;
          setItem(item);
        });
    } else {
      firestore
        .collection("posts")
        .doc(id)
        .get()
        .then((doc) => {
          const item = { id: doc.id, ...doc.data() } as Post;
          setItem(item);
        });
    }
  }, []);
  return [item];
}
