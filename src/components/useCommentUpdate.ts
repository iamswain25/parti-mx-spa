import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { updateComment } from "../graphql/mutation";
import useErrorEffect from "./useErrorEffect";
interface UpdateComment {
  update_mx_comments_by_pk: { id: number };
}
export default function useCommentUpdate(id: number) {
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [mutate, { loading, error }] = useMutation<UpdateComment>(
    updateComment
  );
  useLoadingEffect(loading);
  useErrorEffect(error);
  async function handler(body: string) {
    const res = await mutate({ variables: { id, body } });
    const board_id = res.data?.update_mx_comments_by_pk.id;
    if (id) {
      setSuccess("댓글을 수정했습니다.");
    }
  }
  return handler;
}
