import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}/comments/{comment_id}")
  .onDelete(async (snapshot) => {
    const post = snapshot.ref.parent.parent;
    const countComment = snapshot.get("count_comment") || 0;
    return post?.set(
      {
        count_comment: admin.firestore.FieldValue.increment(-1 - countComment),
      },
      { merge: true }
    );
  });
