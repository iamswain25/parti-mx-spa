import {
  insertUserCandidate,
  removeUserCandidate,
  insertMultipleUserCandidate,
  removeMultipleUserCandidate,
} from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { Post, VoteMetadata } from "../types";
import { useStore } from "../store/store";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function useVoteCandidate(p?: Post) {
  const [{ user_id }] = useStore();
  const metadata = p?.metadata as VoteMetadata;
  const post_id = p?.id;
  const isMultiple = metadata.isMultiple;
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const [insert, { loading: l1, error: e1 }] = useMutation(insertUserCandidate);
  const [unvote, { loading: l2, error: e2 }] = useMutation(removeUserCandidate);
  const [multipleInsert, { loading: l3, error: e3 }] = useMutation(
    insertMultipleUserCandidate
  );
  const [multipleUnvote, { loading: l4, error: e4 }] = useMutation(
    removeMultipleUserCandidate
  );
  useLoadingEffect(l1 || l2 || l3 || l4);
  useErrorEffect(e1 || e2 || e3 || e4);
  return async function handler(candidate_id = 0, hasVoted = false) {
    if (!user_id) {
      return setVisible(true);
    }
    if (hasVoted) {
      if (isMultiple) {
        return multipleUnvote({
          variables: {
            candidate_id: candidate_id,
            user_id,
          },
        });
      } else {
        return unvote({
          variables: {
            candidate_id,
            user_id,
            post_id,
          },
        });
      }
    } else {
      if (isMultiple) {
        return multipleInsert({
          variables: {
            candidate_id,
            post_id,
          },
        });
      } else {
        return insert({
          variables: {
            candidate_id,
            user_id,
            post_id,
          },
        });
      }
    }
  };
}
