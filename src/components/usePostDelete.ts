import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Post } from "../types";

export default function usePostDelete(id: string) {
  const { replace } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);

  async function handler() {
    try {
      const post = await firestore.collection("posts").doc(id).get();
      const { board_id } = post.data() as Post;
      post.ref.delete();
      if (board_id) {
        setSuccess("삭제 되었습니다");
        replace("/home/" + board_id);
      }
    } catch (error) {}
  }

  return function () {
    if (window.confirm("삭제하겠습니까? 복구할 수 없습니다.")) {
      handler();
    }
  };
}
