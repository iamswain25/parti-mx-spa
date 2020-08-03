import { useMutation } from "@apollo/client";
import { deleteComment, updateComment } from "../graphql/mutation";
import { useGlobalState, keys } from "../store/useGlobalState";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
export default (id: number) => {
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [remove, { loading }] = useMutation(deleteComment, {
    variables: { comment_id: id },
  });
  const [nullify, { loading: l2, error: e2 }] = useMutation(updateComment, {
    variables: { id, body: null },
  });
  useLoadingEffect(loading || l2);
  useErrorEffect(e2);
  async function handler() {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      let parent_id = null;
      try {
        const res = await remove();
        parent_id = res.data.delete_mx_comments_by_pk.parent_id;

        setSuccess("댓글을 삭제 했습니다");
      } catch (error) {
        await nullify();
      }
      try {
        // 상위 댓글이 있을 경우 지우려고 시도
        if (parent_id !== null) {
          await remove({ variables: { comment_id: parent_id } });
        }
      } catch (error) {
        // 삭제 실패는 대댓글이 있는 경우로 가만 놓아둠
      }
    }
  }

  return handler;
};
