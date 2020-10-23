import { useGlobalState, keys } from "../store/useGlobalState";
export default (id: string) => {
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  async function handler() {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      let parent_id = null;
      let parent_body = null;
      try {
        // const res = await remove();
        // parent_id = res.data.delete_mx_comments_by_pk.parent.id;
        // parent_body = res.data.delete_mx_comments_by_pk.parent.body;
        setSuccess("댓글을 삭제 했습니다");
      } catch (error) {
        // await nullify();
      }
      try {
        // 상위 댓글이 있을 경우 지우려고 시도
        if (parent_id && !parent_body) {
          // await remove({ variables: { comment_id: parent_id } });
        }
      } catch (error) {
        // 삭제 실패는 대댓글이 있는 경우로 가만 놓아둠
      }
    }
  }

  return handler;
};
