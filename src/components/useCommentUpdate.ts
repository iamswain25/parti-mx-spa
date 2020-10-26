import { firestore } from "../config/firebase";
import { useSuccess } from "../store/useGlobalState";
import { Comment } from "../types";
export default function useCommentUpdate(c: Comment) {
  const [, setSuccess] = useSuccess();
  async function handler(body: string) {
    let docRef = firestore.collection("posts").doc(c.post_id);
    if (c.parent_id) {
      docRef = docRef.collection("comments").doc(c.parent_id);
    }
    await docRef.collection("comments").doc(c.id).update({ body });
    setSuccess("댓글을 수정했습니다.");
  }
  return handler;
}
