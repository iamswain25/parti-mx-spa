import { useError, useSuccess } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Post } from "../types";

export default function usePostDelete(post: Post) {
  const { replace } = useHistory();
  const [, setSuccess] = useSuccess();
  const [, setError] = useError();
  async function handler() {
    try {
      const doc = await firestore.collection("posts").doc(post.id).get();
      const { board_id, group_id } = doc.data() as Post;
      doc.ref.delete();
      if (board_id) {
        setSuccess("삭제 되었습니다");
        replace(`/${group_id}/` + board_id);
      }
    } catch (error) {
      setError(error?.message);
    }
  }

  return function () {
    if (window.confirm("삭제하시겠습니까?")) return handler();
  };
}
