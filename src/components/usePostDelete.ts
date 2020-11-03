import {
  useError,
  useGroupId,
  useRole,
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
  const [role] = useRole();
  async function handler() {
    try {
      const doc = await firestore.collection("posts").doc(post.id).get();
      const { board_id } = doc.data() as Post;
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
    if (role === "organizer") {
      if (window.confirm("삭제하시겠습니까?")) return handler();
    } else {
      const input = window.prompt("비밀번호 4자리를 입력해 주세요");
      if (input === post.password) {
        return handler();
      } else {
        alert("비밀번호가 맞지 않습니다.");
      }
    }
  };
}
