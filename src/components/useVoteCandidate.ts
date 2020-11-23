import { Candidate, Post, VoteMetadata } from "../types";
import { useCurrentUser, useLoginModal } from "../store/useGlobalState";
import { firestore } from "../config/firebase";

export default function useVoteCandidate(
  p: Post<VoteMetadata>,
  candidates: Candidate[]
) {
  const [currentUser] = useCurrentUser();
  const [, setVisible] = useLoginModal();
  return async function handler(c: Candidate) {
    if (!currentUser) {
      return setVisible(true);
    }
    const user_id = currentUser?.uid;
    const docPath = `/posts/${p.id}/candidates/${c.id}/users/${user_id}`;
    const docRef = firestore.doc(docPath);
    if (c.voted) {
      await docRef.delete();
    } else {
      if (p.metadata.isMultiple) {
        await docRef.set({ created_at: new Date() });
      } else {
        await Promise.all(
          candidates.map((c) => {
            if (c.voted) {
              return firestore
                .doc(`/posts/${p.id}/candidates/${c.id}/users/${user_id}`)
                .delete();
            }
            return null;
          })
        );
        await docRef.set({ created_at: new Date() });
      }
    }
  };
}
