import React from "react";
import { firestore } from "../config/firebase";
import { Candidate } from "../types";
export default function useCandidates({
  post_id,
}: {
  post_id: string;
}): [Candidate[]] {
  const [items, setItems] = React.useState<Candidate[]>([]);
  React.useEffect(() => {
    return firestore
      .collection("posts")
      .doc(post_id)
      .collection("candidates")
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...(doc.data() as any) } as Candidate)
        );
        setItems(items);
      });
  }, [post_id]);
  return [items];
}
