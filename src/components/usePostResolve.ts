import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useGroupId, useSuccess } from "../store/useGlobalState";
import { Post } from "../types";

export default function usePostResolve(p: Post) {
  const { push } = useHistory();
  const [, setSuccess] = useSuccess();
  const [group_id] = useGroupId();
  async function handler() {
    const docRef = firestore.collection("posts").doc(p.id);
    await docRef.update({ closed_at: new Date(), is_closed: true });
    setSuccess("정리되었습니다.");
    push(`/${group_id}/` + p.board_id);
  }
  return function () {
    if (window.confirm("토론을 정리하시겠습니까? ")) {
      handler();
    }
  };
}
