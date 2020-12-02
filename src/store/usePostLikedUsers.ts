import React from "react";
import { firestore } from "../config/firebase";
import { PostLike } from "../types";
import { useCurrentUser } from "./useGlobalState";

export default function usePostLikedUsers(id: string) {
  const [items, setItems] = React.useState<PostLike[]>([] as PostLike[]);
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser) {
      return firestore
        .collection("posts")
        .doc(id)
        .collection("likes")
        .orderBy("created_at", "asc")
        .onSnapshot((snapshot) =>
          setItems(
            snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as PostLike)
            )
          )
        );
    }
  }, [currentUser, setItems, id]);
  return [items];
}
