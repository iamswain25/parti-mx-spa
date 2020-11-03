import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useGroupId, useSuccess } from "../store/useGlobalState";
import { Post } from "../types";

export default function usePostAnnounce(p: Post) {
  const { push } = useHistory();
  const [, setSuccess] = useSuccess();
  const [group_id] = useGroupId();
  async function handler() {
    const docRef = firestore.collection("posts").doc(p.id);
    await docRef.update({ is_announced: true, announced_at: new Date() });
    setSuccess("공지 했습니다");
    push(`/${group_id}/` + p.board_id);
  }
  return function () {
    if (window.confirm("공지 하겠습니까?")) {
      handler();
    }
  };
}
