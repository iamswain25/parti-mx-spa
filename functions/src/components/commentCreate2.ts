import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { COUNTER_DOC, PARAM_COLLECTION } from "../env";
export default functions
  .region("asia-northeast3")
  .firestore.document(
    "posts/{post_id}/comments/{comment_id}/comments/{comment_id2}"
  )
  .onCreate(async (snapshot) => {
    const comment = snapshot.ref.parent.parent
      ?.collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC);
    const post = snapshot.ref?.parent?.parent?.parent.parent
      ?.collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC);
    return Promise.all([
      comment?.set(
        { count_comment: admin.firestore.FieldValue.increment(1) },
        { merge: true }
      ),
      post?.set(
        { count_comment: admin.firestore.FieldValue.increment(1) },
        { merge: true }
      ),
    ]);
  });
