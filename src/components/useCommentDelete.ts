import { firestore } from "../config/firebase";
import { useSuccess } from "../store/useGlobalState";
import { Comment } from "../types";
export default function useCommentDelete(c: Comment) {
  const [, setSuccess] = useSuccess();
  async function remove() {
    let docRef = firestore.collection("posts").doc(c.post_id);
    if (c.parent_id) {
      docRef = docRef.collection("comments").doc(c.parent_id);
    }
    await docRef.collection("comments").doc(c.id).delete();
    setSuccess("댓글을 삭제 했습니다");
  }
  async function handler() {
    if (window.confirm("삭제하시겠습니까?")) return remove();
  }

  return handler;
}
