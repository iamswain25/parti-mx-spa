import firebase from "firebase";
import { firestore } from "../config/firebase";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function useCommentUpdate(id: string) {
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  async function handler(body: string) {
    const comment = (
      await firestore
        .collectionGroup("comments")
        .where(firebase.firestore.FieldPath.documentId(), "==", id)
        .get()
    ).docs?.[0];
    if (comment) {
      comment.ref.update({ body });
      setSuccess("댓글을 수정했습니다.");
    }
  }
  return handler;
}
