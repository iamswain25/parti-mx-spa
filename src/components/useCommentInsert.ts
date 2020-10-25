import { firestore } from "../config/firebase";
import { CommentInput } from "../types";
export default function useCommentInsert(callback?: any) {
  function formHandler(args: CommentInput, e: any) {
    const post_id = args.post_id;
    const body = args.body;
    const password = args.password;
    if (post_id) {
      let col = firestore
        .collection("posts")
        .doc(post_id)
        .collection("comments");
      if (args.parent_id) {
        col = firestore
          .collection("posts")
          .doc(post_id)
          .collection("comments")
          .doc(args.parent_id)
          .collection("comments");
      }
      col.add({
        body,
        post_id,
        password,
        count_like: 0,
        count_comment: 0,
        count_view: 0,
        updated_at: new Date(),
        created_at: new Date(),
        name: "익명",
      });
      e.target.reset();
      callback && callback();
    }
  }
  return formHandler;
}
