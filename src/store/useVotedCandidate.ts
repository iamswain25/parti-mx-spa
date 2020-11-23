import React from "react";
import { firestore } from "../config/firebase";
import { useCurrentUser } from "./useGlobalState";
export default function useVotedCandidate({
  post_id,
  candidate_id,
}: {
  post_id: string;
  candidate_id: string;
}): [boolean | undefined] {
  const [item, setItem] = React.useState<boolean | undefined>(undefined);
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser) {
      return firestore
        .collection("posts")
        .doc(post_id)
        .collection("candidates")
        .doc(candidate_id)
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((doc) => setItem(doc.exists));
    }
  }, [post_id, candidate_id, currentUser]);
  return [item];
}
