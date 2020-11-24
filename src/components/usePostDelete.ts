import {
  useBoardId,
  useError,
  useGroupId,
  useSuccess,
} from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Post } from "../types";

export default function usePostDelete(post: Post) {
  const { replace } = useHistory();
  const [, setSuccess] = useSuccess();
  const [, setError] = useError();
  const [group_id] = useGroupId();
  const [board_id] = useBoardId();
  async function handler() {
    try {
      await firestore.collection("posts").doc(post.id).delete();
      setSuccess("삭제 되었습니다");
      replace(`/${group_id}/` + board_id);
    } catch (error) {
      setError(error?.message);
    }
  }

  return function () {
    if (window.confirm("삭제하시겠습니까?")) return handler();
  };
}
