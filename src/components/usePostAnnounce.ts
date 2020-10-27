import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useSuccess } from "../store/useGlobalState";
import { Post } from "../types";

export default function usePostAnnounce(id: string) {
  const { push } = useHistory();
  const [, setSuccess] = useSuccess();

  async function handler() {
    const post = await firestore.collection("posts").doc(id).get();
    const { board_id } = post.data() as Post;
    await post.ref.update({ is_announced: true });
    if (board_id) {
      setSuccess("공지 했습니다");
      push("/home/" + board_id);
    }
  }
  return function () {
    if (window.confirm("공지 하겠습니까?")) {
      handler();
    }
  };
}
