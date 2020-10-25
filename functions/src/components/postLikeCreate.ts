import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}/likes/{id}")
  .onCreate(async (snapshot) => {
    const post = snapshot.ref.parent.parent;
    return post?.set(
      { count_like: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );
  });
