import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { COUNTER_DOC, PARAM_COLLECTION } from "../env";
export default functions
  .region("asia-northeast3")
  .firestore.document(
    "posts/{post_id}/comments/{comment_id}/comments/{comment_id2}/likes/{id}"
  )
  .onDelete(async (snapshot) => {
    const post = snapshot.ref.parent.parent
      ?.collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC);
    return post?.set(
      { count_like: admin.firestore.FieldValue.increment(-1) },
      { merge: true }
    );
  });
