import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useSuccess } from "../store/useGlobalState";
import { Post } from "../types";

export default function usePostResolve(id: string) {
  const { push } = useHistory();
  const [, setSuccess] = useSuccess();
  async function handler() {
    await firestore
      .collection("posts")
      .doc(id)
      .update({ closed_at: new Date() });
    const post = await firestore.collection("posts").doc(id).get();
    const { board_id } = post.data() as Post;
    if (board_id) {
      setSuccess("정리되었습니다.");
      push("/home/" + board_id);
    }
  }

  return function () {
    if (window.confirm("토론을 정리하시겠습니까? ")) {
      handler();
    }
  };
}
