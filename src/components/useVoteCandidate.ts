import { Post, VoteMetadata } from "../types";
import { useCurrentUser, useLoginModal } from "../store/useGlobalState";

export default function useVoteCandidate(p?: Post) {
  const [currentUser] = useCurrentUser();
  const metadata = p?.metadata as VoteMetadata;
  const isMultiple = metadata.isMultiple;
  const [, setVisible] = useLoginModal();
  return async function handler(candidate_id: string, hasVoted = false) {
    if (!currentUser) {
      return setVisible(true);
    }
    if (hasVoted) {
      if (isMultiple) {
        // return multipleUnvote({
        //   variables: {
        //     candidate_id: candidate_id,
        //     userId,
        //   },
        // });
      } else {
        // return unvote({
        //   variables: {
        //     candidate_id,
        //     userId,
        //     post_id,
        //   },
        // });
      }
    } else {
      if (isMultiple) {
        // return multipleInsert({
        //   variables: {
        //     candidate_id,
        //     post_id,
        //   },
        // });
      } else {
        // return insert({
        //   variables: {
        //     candidate_id,
        //     userId,
        //     post_id,
        //   },
        // });
      }
    }
  };
}
