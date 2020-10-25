import React from "react";
import { firestore } from "../config/firebase";
import { useCurrentUser } from "./useGlobalState";

export default function useCommentLiked({
  comment_id,
  post_id,
}: {
  comment_id: string;
  post_id: string;
}) {
  const [liked, setLiked] = React.useState(false);
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser) {
      return firestore
        .collection("posts")
        .doc(post_id)
        .collection("comments")
        .doc(comment_id)
        .collection("lies")
        .doc(currentUser.uid)
        .onSnapshot((doc) => setLiked(doc.exists));
    }
  }, [currentUser, setLiked, comment_id, post_id]);
  return [liked];
}
