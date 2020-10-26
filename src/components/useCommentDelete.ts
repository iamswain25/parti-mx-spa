import { firestore } from "../config/firebase";
import { useSuccess } from "../store/useGlobalState";
import { Comment } from "../types";
export default function useCommentDelete(c: Comment) {
  const [, setSuccess] = useSuccess();
  async function handler() {
    const input = window.prompt("비밀번호를 입력하세요");
    if (input === c.password) {
      let docRef = firestore.collection("posts").doc(c.post_id);
      if (c.parent_id) {
        docRef = docRef.collection("comments").doc(c.parent_id);
      }
      await docRef.collection("comments").doc(c.id).delete();
      setSuccess("댓글을 삭제 했습니다");
    } else {
      window.alert("비밀번호가 맞지 않습니다.");
    }
  }

  return handler;
}
