import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useSuccess } from "../store/useGlobalState";
import { Post } from "../types";
export default function usePostDenounce(p: Post) {
  const { push } = useHistory();
  const [, setSuccess] = useSuccess();
  async function handler() {
    const docRef = firestore.collection("posts").doc(p.id);
    await docRef.update({ is_announced: false, denounced_at: new Date() });
    setSuccess("공지 내립니다");
    push("/home/" + p.board_id);
  }
  return function () {
    if (window.confirm("공지 내리겠습니까?")) {
      handler();
    }
  };
}
