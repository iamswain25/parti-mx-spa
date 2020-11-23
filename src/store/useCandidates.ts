import React from "react";
import { firestore } from "../config/firebase";
import { Candidate } from "../types";
import { useCurrentUser } from "./useGlobalState";

export default function useCandidates({
  post_id,
}: {
  post_id: string;
}): [Candidate[]] {
  const [currentUser] = useCurrentUser();
  const [candidates, setCandidates] = React.useState<Candidate[]>([]);
  const [items, setItems] = React.useState<Candidate[]>([]);
  console.log(items);
  React.useEffect(() => {
    const candidateCollectionRef = firestore
      .collection("posts")
      .doc(post_id)
      .collection("candidates");
    return candidateCollectionRef
      .orderBy("order", "asc")
      .onSnapshot((snapshot) => {
        const candidates = snapshot.docs.map(
          (doc) =>
            ({ id: doc.id, post_id, ...(doc.data() as any) } as Candidate)
        );
        setCandidates(candidates);
      });
  }, [post_id]);
  React.useEffect(() => {
    if (candidates && currentUser) {
      const candidateCollectionRef = firestore
        .collection("posts")
        .doc(post_id)
        .collection("candidates");
      const unsubscribeArr = candidates.map((c) =>
        candidateCollectionRef
          .doc(c.id)
          .collection("users")
          .doc(currentUser.uid)
          .onSnapshot((snapshot) => {
            c.voted = snapshot.exists;
            setItems([...candidates]);
          })
      );
      return () => {
        unsubscribeArr.map((unsubscribe) => unsubscribe());
      };
    }
  }, [candidates, currentUser, post_id]);
  return [items];
}
