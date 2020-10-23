
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Post } from "../types";
export default function usePostDenounce(id: string) {
  const { push } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);

  async function handler() {
    const post = await firestore.collection("posts").doc(id).get();
    const { board_id } = post.data() as Post;
    await post.ref.update({ is_announced: false });
    if (board_id) {
      setSuccess("공지 내립니다");
      push("/home/" + board_id);
    }
  }
  return function () {
    if (window.confirm("공지 내리겠습니까?")) {
      handler();
    }
  };
}
