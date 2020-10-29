import React from "react";
import { firestore } from "../config/firebase";
import { Vote } from "../types";
export default function useVotes({
  post_id,
  candidate_id,
}: {
  post_id: string;
  candidate_id: string;
}): [Vote[]] {
  const [items, setItems] = React.useState<Vote[]>([]);
  React.useEffect(() => {
    return firestore
      .collection("posts")
      .doc(post_id)
      .collection("candidates")
      .doc(candidate_id)
      .collection("votes")
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...(doc.data() as any) } as Vote)
        );
        setItems(items);
      });
  }, [post_id, candidate_id]);
  return [items];
}
