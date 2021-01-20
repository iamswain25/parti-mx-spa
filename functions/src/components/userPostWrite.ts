import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const firestore = admin.firestore();
export default functions
  .region("asia-northeast3")
  .firestore.document("users/{user_id}/posts/{post_id}")
  .onWrite(async (change, context) => {
    const { post_id } = context.params;
    if (change.after)
      return firestore
        .collection("posts")
        .doc(post_id)
        .set(
          {
            count_view: admin.firestore.FieldValue.increment(1),
            last_viewed_at: new Date(),
          },
          { merge: true },
        );
    return;
  });
