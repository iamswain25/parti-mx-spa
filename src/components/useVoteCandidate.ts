import { Candidate, Post, VoteMetadata } from "../types";
import { useCurrentUser } from "../store/useGlobalState";
import { firestore } from "../config/firebase";
import usePermission from "../store/usePermission";

export default function useVoteCandidate(
  p: Post<VoteMetadata>,
  candidates: Candidate[],
) {
  const [currentUser] = useCurrentUser();
  const [hasPermission, showAlert] = usePermission("like");
  const handler = (c: Candidate, liked: boolean) => async () => {
    if (!hasPermission) {
      return showAlert();
    }
    if (p.is_closed) return;
    const user_id = currentUser?.uid;
    const docPath = `/posts/${p.id}/candidates/${c.id}/users/${user_id}`;
    const likeDocPath = `/posts/${p.id}/likes/${user_id}`;
    const docRef = firestore.doc(docPath);
    const likeRef = firestore.doc(likeDocPath);
    const promises = [];
    if (c.voted && liked) {
      const isOtherCandidateVoted = candidates.some(
        c3 => c.id !== c3.id && c3.voted,
      );
      if (!isOtherCandidateVoted) {
        // 다른 candidate도 투표하지 않았으면 like를 지운다.
        promises.push(likeRef.delete());
      }
      promises.push(docRef.delete());
    } else {
      if ((await likeRef.get()).exists) {
        promises.push(likeRef.set({ updated_at: new Date() }, { merge: true }));
      } else {
        promises.push(likeRef.set({ created_at: new Date() }, { merge: true }));
      }
      if (p.metadata.isMultiple) {
        promises.push(docRef.set({ created_at: new Date() }));
      } else {
        promises.push(
          ...candidates.map(c2 => {
            if (c.id === c2.id) {
              return docRef.set({ created_at: new Date() });
            }
            if (c2.voted) {
              return firestore
                .doc(`/posts/${p.id}/candidates/${c2.id}/users/${user_id}`)
                .delete();
            }
            return null;
          }),
        );
      }
    }
    return Promise.all(promises);
  };
  return handler;
}
