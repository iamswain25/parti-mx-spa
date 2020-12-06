import React from "react";
import { firestore } from "../config/firebase";
import { Candidate, Vote } from "../types";
export default function useVotes({ post_id, id }: Candidate): [Vote[]] {
  const [items, setItems] = React.useState<Vote[]>([]);
  React.useEffect(() => {
    return firestore
      .collection("posts")
      .doc(post_id)
      .collection("candidates")
      .doc(id)
      .collection("users")
      .onSnapshot(
        (snapshot) => {
          const items = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                post_id,
                candidate_id: id,
                ...(doc.data() as any),
              } as Vote)
          );
          setItems(items);
        },
        (err) => {
          console.warn(err);
        }
      );
  }, [post_id, id]);
  return [items];
}
