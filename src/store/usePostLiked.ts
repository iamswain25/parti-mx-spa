import React from "react";
import { firestore } from "../config/firebase";
import { useCurrentUser } from "./useGlobalState";

export default function usePostLiked(id: string) {
  const [liked, setLiked] = React.useState(false);
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser) {
      return firestore
        .collection("posts")
        .doc(id)
        .collection("likes")
        .doc(currentUser.uid)
        .onSnapshot((doc) => setLiked(doc.exists));
    }
  }, [currentUser, setLiked, id]);
  return [liked];
}
