import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}/comments/{comment_id}")
  .onCreate(async (snapshot) => {
    const doc = snapshot.ref.parent.parent;
    return doc?.set(
      {
        count_comment: admin.firestore.FieldValue.increment(1),
        last_commented_at: new Date(),
      },
      { merge: true }
    );
  });
