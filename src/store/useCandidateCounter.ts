import React from "react";
import { firestore } from "../config/firebase";
import { COUNTER_DOC, PARAM_COLLECTION } from "../helpers/options";
type VoteCounter = { count_vote: number } | null | undefined;
export default function useCandidateCounter({
  post_id,
  candidate_id,
}: {
  post_id: string;
  candidate_id: string;
}): [VoteCounter] {
  const [item, setItem] = React.useState<VoteCounter>(undefined);
  React.useEffect(() => {
    return firestore
      .collection("posts")
      .doc(post_id)
      .collection("candidates")
      .doc(candidate_id)
      .collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setItem({
            id: doc.id,
            post_id,
            candidate_id,
            ...(doc.data() as any),
          });
        } else {
          setItem(null);
        }
      });
  }, [post_id, candidate_id]);
  return [item];
}
