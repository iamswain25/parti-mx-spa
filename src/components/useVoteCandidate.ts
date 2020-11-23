import { Post, VoteMetadata } from "../types";
import { useCurrentUser, useLoginModal } from "../store/useGlobalState";
import { firestore } from "../config/firebase";

export default function useVoteCandidate(p: Post<VoteMetadata>) {
  const [currentUser] = useCurrentUser();
  const [, setVisible] = useLoginModal();
  return async function handler(candidate_id: string, hasVoted = false) {
    if (!currentUser) {
      return setVisible(true);
    }
    const user_id = currentUser?.uid;
    const docPath = `/posts/${p.id}/candidates/${candidate_id}/users/${user_id}`;
    const docRef = firestore.doc(docPath);
    if (hasVoted) {
      await docRef.delete();
    } else {
      await docRef.set({ created_at: new Date() });
    }
  };
}
